import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

import { ResultEntity } from 'src/common/result-entity';
import { OauthToken } from '../../entities/oauth_token';
import { ErrorMessages } from 'src/common/constants/error-messages.constant';
import { OauthTokenServiceService } from '../oauth-token-service/oauth-token-service.service';
import { OauthTokenDto } from '../../dto/oauth_token_dto';
import { KakaoOauthTokenDto } from '../../dto/kakao_oauth_token_response';
import { AxiosResponse } from 'axios';
import { PROVIDER } from 'src/common/provider_enum';
import buildUrl from 'build-url-ts';
import { OpenBankingOauthTokenDto } from '../../dto/ob_oauth_token_dto';
import { OpenBankingUser } from '../../entities/openbanking_user';
import { OpenbankingUserServiceService } from '../openbanking-user-service/openbanking-user-service.service';

@Injectable()
export class OauthService {

    constructor(
        private readonly configService: ConfigService, 
        private readonly httpService: HttpService,
        private readonly oauthTokenService: OauthTokenServiceService,
        private readonly openBankingUserService: OpenbankingUserServiceService,
    ) {}
    
    async registerUri(provider: PROVIDER) : Promise<ResultEntity<string>> {
        let registerUri: string;
        if(provider == PROVIDER.KAKAO) {
            registerUri = this.configService.get('KAKAO_OAUTH_AUTHORIZE_URI') 
            + '?client_id=' + this.configService.get('KAKAO_APP_KEY') 
            + '&redirect_uri=' + this.configService.get('KAKAO_REDIRECT_URI') 
            + '&response_type=code';
        } else if (provider == PROVIDER.OPENBANKING) {

            const uri = new URL(this.configService.get('OPENBANKING_OAUTH_AUTHORIZE_URI'));

            // uri.searchParams.set('response_type', 'code');
            // uri.searchParams.set('client_id', this.configService.get('OPENBANKING_CLIENT_ID'));
            // uri.searchParams.set('redirect_uri', this.configService.get('OPENBANKING_REDIRECT_URI'));
            // //uri.searchParams.set('scope', 'login inquiry transfer');
            // uri.searchParams.set('client_info', 'test');
            // uri.searchParams.set('state', 'b80BLsfigm9OokPTjy03elbJqRHOfGSY');
            // uri.searchParams.set('auth_type', '0');
            // uri.searchParams.set('cellphone_cert_yn', 'Y');
            // uri.searchParams.set('authorized_cert_yn', 'Y');
            // uri.searchParams.set('account_hold_auth_yn', 'N');
            // uri.searchParams.set('register_info', 'A');


            const uriWithParams = this.configService.get('OPENBANKING_OAUTH_AUTHORIZE_URI') 
            + '?response_type=code'
            + '&client_id=' + this.configService.get('OPENBANKING_CLIENT_ID') 
            + '&redirect_uri=' + encodeURIComponent(this.configService.get('OPENBANKING_REDIRECT_URI'))
            + '&scope=' + encodeURIComponent('login inquiry transfer')
            + '&client_info=test'
            + '&state=b80BLsfigm9OokPTjy03elbJqRHOfGSY'
            + '&auth_type=0'
            + '&cellphone_cert_yn=Y'
            + '&authorized_cert_yn=Y'
            + '&account_hold_auth_yn=N'
            + '&register_info=A';
            
            return ResultEntity.success(uriWithParams);
        }

        return ResultEntity.success(registerUri);
    }

    async getOauthTokenWithCode(code: string, provider: PROVIDER): Promise<ResultEntity<OauthTokenDto>> {

        let response: AxiosResponse<OauthTokenDto>;

        if(provider == PROVIDER.KAKAO) { // Kakao
            const tokenUri = this.configService.get('KAKAO_OAUTH_TOKEN_URI');

            // Header Content-Type: application/x-www-form-urlencoded
            // Body: grant_type=authorization_code&client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&code=CODE

            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
            };

            const body = {
                grant_type: 'authorization_code',
                client_id: this.configService.get('KAKAO_APP_KEY'),
                redirect_uri: this.configService.get('KAKAO_REDIRECT_URI'),
                code: code
            };
            response = await firstValueFrom(this.httpService.post<KakaoOauthTokenDto>(tokenUri, body, { headers }));
        } else if (provider == PROVIDER.OPENBANKING) { // Open Banking
            const tokenUri = this.configService.get('OPENBANKING_OAUTH_TOKEN_URI');
            const headers = { // Charset: UTF-8
                'Content-Type': 'application/x-www-form-urlencoded'
            };

            const body = {
                code: code,
                client_id: this.configService.get('OPENBANKING_CLIENT_ID'),
                client_secret: this.configService.get('OPENBANKING_CLIENT_SECRET'),
                redirect_uri: this.configService.get('OPENBANKING_REDIRECT_URI'),
                grant_type: 'authorization_code'
            };

            response = await firstValueFrom(this.httpService.post<OpenBankingOauthTokenDto>(tokenUri, body, { headers }));      
        }      

        if(response.status !== 200) {
            return ResultEntity.error(ErrorMessages.INTERNAL_SERVER_ERROR);
        }

        // TODO: Token Exipired Date    
        let accestTokenExpiredDate: Date;
        let refreshTokenExpiredDate: Date;
        if(provider == PROVIDER.KAKAO) {
            accestTokenExpiredDate = new Date(new Date().getTime() + response.data.expires_in * 1000);
            refreshTokenExpiredDate = new Date(new Date().getTime() + response.data.refresh_token_expires_in * 1000);
        } else if(provider == PROVIDER.OPENBANKING) {
            const TEN_DAYS_IN_MS = 10 * 24 * 60 * 60 * 1000;
            accestTokenExpiredDate = new Date(new Date().getTime() + response.data.expires_in * 1000);
            refreshTokenExpiredDate = new Date(accestTokenExpiredDate.getTime()  + TEN_DAYS_IN_MS); //10 days );
        }
        const oauthToken = new OauthToken();  
        
        oauthToken.tokenType = response.data.token_type;
        oauthToken.accessToken = response.data.access_token;
        oauthToken.refreshToken = response.data.refresh_token;
        oauthToken.accessTokenExpiredDate = accestTokenExpiredDate;
        oauthToken.refreshTokenExpiredDate = refreshTokenExpiredDate;

        if(provider == PROVIDER.OPENBANKING) {

            const openBankingUserDto = response.data as OpenBankingOauthTokenDto;
            // TODO: Save OpenBanking User
            const openBankingUser = new OpenBankingUser();
            openBankingUser.userSeqNo = openBankingUserDto.user_seq_no;
            openBankingUser.oauthToken = oauthToken;
            await this.openBankingUserService.save(openBankingUser);
        } else {

            // TODO: Save Token
            const result = await this.oauthTokenService.save(oauthToken);
            if(result.error) {
                return ResultEntity.error(result.error);
            }
        }

        return ResultEntity.success(response.data);

    }


}

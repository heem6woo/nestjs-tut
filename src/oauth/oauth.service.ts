import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ResultEntity } from 'src/common/result-entity';

@Injectable()
export class OauthService {

    static baseUri: string = 'https://kauth.kakao.com/oauth/authorize';

    constructor(private readonly configService: ConfigService) {}
    
    async registerUri() : Promise<ResultEntity<string>> {

        const registerUri = OauthService.baseUri + '?client_id=' + this.configService.get('KAKAO_APP_KEY') + '&redirect_uri=' + this.configService.get('KAKAO_REDIRECT_URI') + '&response_type=code';

        return ResultEntity.success(registerUri);
    }

}

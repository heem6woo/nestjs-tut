import { Controller, Get, Param, Query } from "@nestjs/common";
import { OauthService } from "./services/oauth-service/oauth.service";
import { ResultEntity } from "src/common/result-entity";
import { ResponseEntity } from "src/common/response-entity";
import { ErrorMessages } from "src/common/constants/error-messages.constant";
import { OauthTokenDto } from "./dto/oauth_token_dto";
import { PROVIDER } from "src/common/provider_enum";

@Controller('oauth')
export class OauthController {

    constructor(private readonly oauthService: OauthService) {}

    @Get(':provider')
    async loginWithProvider(@Param('provider') provider: string) : Promise<ResponseEntity<string>> {

        var result : ResultEntity<string>;

        if(provider == 'kakao') {
            result = await this.oauthService.registerUri(PROVIDER.KAKAO);
        } else if (provider == 'openbanking') {
            result = await this.oauthService.registerUri(PROVIDER.OPENBANKING);
        }

        if(result.error) {
            return ResponseEntity.error(result.error);
        } else {
            return ResponseEntity.success(result.data);
        }
    }

    @Get(':provider/redirect')
    async redirect(
        @Param('provider') provider: string,
        @Query('code') code?: string,
        @Query('state') state?: string,
        @Query('scope') scope?: string,
        @Query('client_info') client_info?: string, // Open Banking
        @Query('error') error?: string, // Kakao
        @Query('error_description') error_description?: string, // Kakao
    ): Promise<ResponseEntity<OauthTokenDto>> {
        var result: ResultEntity<OauthTokenDto>;

        if (error) {
            // Handle error case
            return ResponseEntity.error(error_description || error);
        }

        if (provider == 'kakao' && code) {
            result = await this.oauthService.getOauthTokenWithCode(code, PROVIDER.KAKAO);
            return result.error 
                ? ResponseEntity.error(result.error)
                : ResponseEntity.success(result.data);
        } else if (provider == 'openbanking' && code) {
            result = await this.oauthService.getOauthTokenWithCode(code, PROVIDER.OPENBANKING);
            return result.error 
                ? ResponseEntity.error(result.error)
                : ResponseEntity.success(result.data);
        }

        return ResponseEntity.error(ErrorMessages.BAD_REQUEST);
    }
}

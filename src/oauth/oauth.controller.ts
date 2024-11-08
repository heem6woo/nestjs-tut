import { Controller, Get, Param } from "@nestjs/common";
import { OauthService } from "./oauth.service";
import { ResultEntity } from "src/common/result-entity";
import { ResponseEntity } from "src/common/response-entity";
import { ErrorMessages } from "src/common/constants/error-messages.constant";

@Controller('oauth')
export class OauthController {

    constructor(private readonly oauthService: OauthService) {}

    @Get(':provider')
    async loginWithProvider(@Param('provider') provider: string) : Promise<ResponseEntity<string>> {
        if(provider == 'kakao') {
            const result : ResultEntity<string> = await this.oauthService.registerUri();

            if(!result.success) {
                return ResponseEntity.error(result.error);
            } else {
                return ResponseEntity.success(result.data);
            }
        }

        return ResponseEntity.error(ErrorMessages.NOT_SUPPORTED_PROVIDER);
    }

    @Get(':provider/redirect')
    redirect(@Param('provider') provider:string) {
        if(provider == 'kakao') {

        }
    }
}

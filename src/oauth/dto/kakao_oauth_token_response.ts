import { OauthTokenDto  } from "./oauth_token_dto";

export class KakaoOauthTokenDto extends OauthTokenDto {
    constructor(partial: Partial<KakaoOauthTokenDto> = {}) {
        super(partial);
    }

    get accessToken(): string {
        return this.access_token;
    }

    get tokenType(): string {
        return this.token_type;
    }

    get refreshToken(): string {
        return this.refresh_token;
    }

    get expiresIn(): number {
        return this.expires_in;
    }

    get refreshTokenExpiresIn(): number {
        return this.refresh_token_expires_in;
    }
}
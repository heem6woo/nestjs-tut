export abstract class OauthTokenDto {
    access_token: string;
    token_type?: string = 'Bearer';
    refresh_token?: string;
    expires_in?: number;
    refresh_token_expires_in?: number;
    accessTokenExpiredDate?: Date;
    refreshTokenExpiredDate?: Date;

    constructor(partial: Partial<OauthTokenDto> = {}) {
        Object.assign(this, partial);
    }
}
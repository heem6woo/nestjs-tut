import { OauthTokenDto } from "./oauth_token_dto";

export class OpenBankingOauthTokenDto extends OauthTokenDto {

    // Access Token
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    _scope: string;
    user_seq_no: number;

    get accessToken(): string {
        return this.access_token;
    }   

    get refreshToken(): string {
        return this.refresh_token;
    }   

    get expiresIn(): number {
        return this.expires_in;
    }          

    get scope(): string {   
        return this._scope;
    }

    get userSeqNo(): number {
        return this.user_seq_no;
    }
}

import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { Column } from "typeorm";

@Entity()
export class OauthToken {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'token_type' })
    token_type: string = "Bearer"; // default: 'Bearer'

    @Column({ name: 'access_token' , length: 1024})
    access_token: string; 

    @Column({ name: 'refresh_token', length: 1024 })
    refresh_token: string;

    @Column({ name: 'access_token_expired_date' })
    access_token_expired_date: Date;

    @Column({ name: 'refresh_token_expired_date' })
    refresh_token_expired_date: Date;


    get accessToken() {
        return this.access_token;
    }

    set accessToken(access_token) {
        this.access_token = access_token;
    }

    get tokenType() {
        return this.token_type;
    }

    set tokenType(token_type) {
        this.token_type = token_type;
    }

    get refreshToken() {
        return this.refresh_token;
    }

    set refreshToken(refresh_token) {
        this.refresh_token = refresh_token;
    }

    get accessTokenExpiredDate() {
        return this.access_token_expired_date;
    }

    set accessTokenExpiredDate(access_token_expired_date) {
        this.access_token_expired_date = access_token_expired_date;
    }

    get refreshTokenExpiredDate() {
        return this.refresh_token_expired_date;
    }

    set refreshTokenExpiredDate(refresh_token_expired_date) {
        this.refresh_token_expired_date = refresh_token_expired_date;
    }
}
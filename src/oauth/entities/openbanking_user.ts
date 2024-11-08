import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OauthToken } from "./oauth_token";


@Entity({ name: 'openbanking_user' })
export class OpenBankingUser extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'user_seq_no' })
    user_seq_no: number;

    @OneToOne(() => OauthToken)
    @JoinColumn({ name: 'oauth_token_id' })
    oauth_token: OauthToken;

    get userSeqNo(): number {
        return this.userSeqNo;
    }

    get oauthToken(): OauthToken {
        return this.oauthToken;
    }

    set oauthToken(oauthToken: OauthToken) {
        this.oauth_token = oauthToken;
    }   

    set userSeqNo(userSeqNo: number) {
        this.user_seq_no = userSeqNo;
    }
}

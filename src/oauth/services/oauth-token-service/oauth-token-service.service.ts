import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OauthToken } from '../../entities/oauth_token';
import { DataSource, Repository } from 'typeorm';
import { ResultEntity } from 'src/common/result-entity';
import { ErrorMessages } from 'src/common/constants/error-messages.constant';


@Injectable()
export class OauthTokenServiceService {

    constructor(
        @InjectRepository(OauthToken) private readonly oauthTokenRepository: Repository<OauthToken>,
        private dataSource: DataSource
    ) {}


    async save(oauthToken: OauthToken): Promise<ResultEntity<OauthToken>> {
        let result : OauthToken;
        if(process.env.DATABASE_TRANSACTION === 'RUNNER') {
            const queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
            try {
                result = await queryRunner.manager.save(OauthToken, oauthToken);
                await queryRunner.commitTransaction();
            } catch (error) {
                await queryRunner.rollbackTransaction();
                return ResultEntity.error(ErrorMessages.INTERNAL_SERVER_ERROR);
            } finally {
                await queryRunner.release();
            }
        } else {
            const result = await this.oauthTokenRepository.save(oauthToken);
        }
            return ResultEntity.success(result);
    }

    async findByOuthTokenId(outhTokenId: number): Promise<ResultEntity<OauthToken>> {
        const result = await this.oauthTokenRepository.findOneBy({ id: outhTokenId });
        return ResultEntity.success(result);
    }

}

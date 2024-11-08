import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultEntity } from 'src/common/result-entity';
import { OpenBankingUser } from 'src/oauth/entities/openbanking_user';
import { Repository } from 'typeorm';

@Injectable()
export class OpenbankingUserServiceService {

    constructor(
        @InjectRepository(OpenBankingUser) private readonly openBankingUserRepository: Repository<OpenBankingUser>,
    ) {}

    async save(openBankingUser: OpenBankingUser): Promise<ResultEntity<OpenBankingUser>> {
        const result = await this.openBankingUserRepository.save(openBankingUser);
        return ResultEntity.success(result);
    }

}

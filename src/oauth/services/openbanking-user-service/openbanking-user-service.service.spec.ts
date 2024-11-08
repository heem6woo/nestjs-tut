import { Test, TestingModule } from '@nestjs/testing';
import { OpenbankingUserServiceService } from './openbanking-user-service.service';

describe('OpenbankingUserServiceService', () => {
  let service: OpenbankingUserServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenbankingUserServiceService],
    }).compile();

    service = module.get<OpenbankingUserServiceService>(OpenbankingUserServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { OauthTokenServiceService } from './oauth-token-service.service';

describe('OauthTokenServiceService', () => {
  let service: OauthTokenServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OauthTokenServiceService],
    }).compile();

    service = module.get<OauthTokenServiceService>(OauthTokenServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

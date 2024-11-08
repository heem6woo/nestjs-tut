import { Module } from '@nestjs/common';
import { OauthController } from './oauth.controller';
import { OauthService } from './services/oauth-service/oauth.service';
import { OauthTokenServiceService } from './services/oauth-token-service/oauth-token-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OauthToken } from './entities/oauth_token';
import { OpenbankingUserServiceService } from './services/openbanking-user-service/openbanking-user-service.service';
import { OpenBankingUser } from './entities/openbanking_user';

@Module({
  imports: [TypeOrmModule.forFeature([OauthToken]), TypeOrmModule.forFeature([OpenBankingUser]) ],
  controllers: [OauthController],
  providers: [OauthService, OauthTokenServiceService, OpenbankingUserServiceService],
})
export class OauthModule {}

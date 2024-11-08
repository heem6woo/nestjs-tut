import { Module } from '@nestjs/common';
import { OauthController } from './oauth.controller';
import { HttpModule } from '@nestjs/axios';
import { OauthService } from './oauth.service';

@Module({
  imports: [HttpModule],
  controllers: [OauthController],
  providers: [OauthService],
})
export class OauthModule {}

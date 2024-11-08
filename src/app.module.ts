import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OauthModule } from './oauth/oauth.module';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { OauthToken } from './oauth/entities/oauth_token';
import { OpenBankingUser } from './oauth/entities/openbanking_user';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [process.env.NODE_ENV === 'production'
        ? 'src/config/.production.env'
        : 'src/config/.development.env',
      ],
      isGlobal: true,   
     }),
     HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
      global: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [OauthToken, OpenBankingUser],
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    OauthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

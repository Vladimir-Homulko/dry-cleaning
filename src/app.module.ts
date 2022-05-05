import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { DryCleaningModule } from './dry-cleaning/dry-cleaning.module';
import { OrderModule } from './order/order.module';
import { ServiceModule } from './service/service.module';
import {SeedsModule} from "./seeds/seeds.module";
import {AuthorizationModule} from "./authorization/authorization.module";
import {APP_GUARD} from "@nestjs/core";
import {JwtGuard} from "./common/guards/jwt.guard";
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URL),
    UserModule,
    DryCleaningModule,
    OrderModule,
    ServiceModule,
    SeedsModule,
    AuthorizationModule,
    MailModule
  ],
  providers: [
      {
        provide: APP_GUARD,
        useClass: JwtGuard
      }
  ],
})
export class AppModule {}

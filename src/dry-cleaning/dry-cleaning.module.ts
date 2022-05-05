import { Module } from '@nestjs/common';
import { DryCleaningService } from './dry-cleaning.service';
import { DryCleaningController } from './dry-cleaning.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {DryCleaning, DryCleaningSchema} from "./entities/dry-cleaning.entity";
import {UserModule} from "../user/user.module";

@Module({
  imports: [
      MongooseModule.forFeature([{ name: DryCleaning.name, schema: DryCleaningSchema }]),
      UserModule
  ],
  controllers: [DryCleaningController],
  providers: [DryCleaningService],
  exports: [DryCleaningService]
})
export class DryCleaningModule {}

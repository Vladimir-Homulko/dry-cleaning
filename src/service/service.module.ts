import {Module} from '@nestjs/common';
import {ServiceService} from './service.service';
import {ServiceController} from './service.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {ServiceSchema} from "./entities/service.entity";
import {DryCleaningModule} from "../dry-cleaning/dry-cleaning.module";

@Module({
  imports: [
      MongooseModule.forFeature([{ name: 'Service', schema: ServiceSchema }]),
      DryCleaningModule
  ],
  controllers: [ServiceController],
  providers: [ServiceService],
  exports: [ServiceService]
})
export class ServiceModule {}

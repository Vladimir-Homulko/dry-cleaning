import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Order, OrderSchema} from "./entities/order.entity";
import {ServiceModule} from "../service/service.module";
import {UserModule} from "../user/user.module";

@Module({
  imports: [
      MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
      ServiceModule,
      UserModule
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}

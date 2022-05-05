import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {Service} from "../../service/entities/service.entity";
import {Status} from "../order.constaints";

import * as mongoose from "mongoose";

export type OrderSchema = Order & Document

@Schema({
    timestamps: true
})
export class Order {

    @Prop({ enum: Status })
    status: string = Status.NEW

    @Prop()
    createdDate: Date = new Date()

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Service' })
    service: Service

    @Prop()
    comment: string

}

export const OrderSchema = SchemaFactory.createForClass(Order)

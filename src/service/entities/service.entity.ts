import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServiceDocument = Service & Document;

@Schema()
export class Service {

    @Prop({ required: true })
    type: string;

    @Prop({ required: true })
    price: number;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);

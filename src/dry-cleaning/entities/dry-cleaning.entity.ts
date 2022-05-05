import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {Service} from "../../service/entities/service.entity";

import * as mongoose from 'mongoose';
import {User} from "../../user/entities/user.entity";

export type DryCleaningDocument = DryCleaning & Document;

@Schema({
    timestamps: true
})
export class DryCleaning {

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }] })
    services: Service[];

    @Prop()
    photos: string[];

    @Prop( { type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User
}

export const DryCleaningSchema = SchemaFactory.createForClass(DryCleaning);

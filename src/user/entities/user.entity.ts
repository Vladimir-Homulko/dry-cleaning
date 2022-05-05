import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

import {Role} from "../../authorization/authorization.constants";
import {UserHelper} from "../user.helper";
import * as bcrypt from "bcrypt";

export type UserDocument = User & Document

@Schema({
    timestamps: true
})
export class User {

    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    surname: string

    @Prop({ required: true, unique: true })
    email: string

    @Prop()
    balance: number = UserHelper.generateBalance()

    @Prop({ select: false })
    unique: string

    @Prop({ select: false })
    refresh: string

    @Prop( { required: true, select: false })
    password: string

    @Prop({ enum: Role, default: Role.CLIENT })
    role: Role

}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.pre<User>('save', async function(next) {
    const unique = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, unique)

    this.unique = unique
    this.password = hashedPassword

    next()
})
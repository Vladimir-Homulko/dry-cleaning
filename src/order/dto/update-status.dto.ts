import {IsEnum} from "class-validator";
import {Status} from "../order.constaints";

export class UpdateStatusDto {

    @IsEnum(Status)
    status: string
}
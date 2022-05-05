import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class PathDto {

    @ApiProperty()
    @IsString()
    path: string
}
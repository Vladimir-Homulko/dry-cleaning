import {Service} from "../../service/entities/service.entity";
import {IsArray, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {User} from "../../user/entities/user.entity";

export class CreateDryCleaningDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsOptional()
    @IsArray()
    services: Service[];

    @IsOptional()
    @IsArray()
    photosPaths: string[];

    @IsOptional()
    user: User
}

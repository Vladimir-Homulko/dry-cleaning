import {IsInt, IsNotEmpty, IsString} from "class-validator";

export class CreateServiceDto {

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsInt()
    @IsNotEmpty()
    price: number;

}

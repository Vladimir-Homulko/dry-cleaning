import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    Length,
    Matches,
    MaxLength,
    MinLength
} from "class-validator";
import {Role} from "../../authorization/authorization.constants";
import {ApiProperty} from "@nestjs/swagger";

export class CreateAdminDto {

    @IsString()
    @Length(2, 10 ,{
        message: 'Name length is minimum 2, maximum 10'
    })
    name: string

    @IsString()
    @Length(2, 10 ,{
        message: 'Surname length is minimum 2, maximum 10'
    })
    surname: string

    @IsEmail()
    email: string

    @IsOptional()
    @IsString()
    refresh?: string

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password: string;

    @IsEnum(Role)
    role: string

}
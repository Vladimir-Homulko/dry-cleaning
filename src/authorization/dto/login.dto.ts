import {IsEmail, IsString, Matches, MaxLength, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class LoginDto {

    @ApiProperty()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password: string;
}
import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsOptional, IsString, Length, Matches, MaxLength, MinLength} from "class-validator";

export class UpdateCurrentUserDto {

    @ApiProperty({
        minLength: 2,
        maxLength: 10
    })
    @IsOptional()
    @IsString()
    @Length(2, 10 ,{
        message: 'Name length is minimum 2, maximum 10'
    })
    name: string

    @ApiProperty({
        minLength: 2,
        maxLength: 10
    })
    @IsOptional()
    @IsString()
    @Length(2, 10 ,{
        message: 'Surname length is minimum 2, maximum 10'
    })
    surname: string

    @ApiProperty()
    @IsOptional()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password: string;
}
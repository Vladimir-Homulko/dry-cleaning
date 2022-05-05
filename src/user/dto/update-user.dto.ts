import { CreateUserDto } from './create-user.dto';
import {PartialType as SwaggerType} from "@nestjs/swagger";
import {PartialType} from "@nestjs/mapped-types";

export class UpdateUserDto extends SwaggerType(PartialType(CreateUserDto)) {}

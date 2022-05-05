import { PartialType as SwaggerType } from '@nestjs/swagger';
import { CreateServiceDto } from './create-service.dto';
import {PartialType} from "@nestjs/mapped-types";

export class UpdateServiceDto extends SwaggerType(PartialType(CreateServiceDto)) {}

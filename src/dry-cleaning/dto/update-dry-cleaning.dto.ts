import { PartialType as SwaggerType } from '@nestjs/swagger';
import { CreateDryCleaningDto } from './create-dry-cleaning.dto';
import {PartialType} from "@nestjs/mapped-types";

export class UpdateDryCleaningDto extends SwaggerType(PartialType(CreateDryCleaningDto)) {}

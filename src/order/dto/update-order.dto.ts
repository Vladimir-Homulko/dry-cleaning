import {PartialType, PartialType as SwaggerType} from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends SwaggerType(PartialType(CreateOrderDto)) {}

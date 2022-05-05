import {Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards} from '@nestjs/common';
import {OrderService} from './order.service';
import {CreateOrderDto} from './dto/create-order.dto';
import {UpdateOrderDto} from './dto/update-order.dto';
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {ServiceIdDto} from "./dto/service-id.dto";
import {PaginationDto} from "../utils/utils.dto";
import RoleGuard from "../common/guards/role.guard";
import {Role} from "../authorization/authorization.constants";
import {UserIdDto} from "./dto/user-id.dto";
import {UpdateStatusDto} from "./dto/update-status.dto";
import {GetCurrentUserId} from "../common/decorators/get-current-user-id.decorator";

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  public create(
      @GetCurrentUserId() userId: string,
      @Query() query: ServiceIdDto,
      @Body() createOrderDto: CreateOrderDto
  ) {
    return this.orderService.create(userId, query, createOrderDto);
  }

  @UseGuards(RoleGuard(Role.ADMIN))
  @Get()
  public async findAll(@Query() pagination: PaginationDto) {
    return this.orderService.findAll(pagination);
  }

  @ApiResponse({
    description: 'Get orders by client'
  })
  @Get('personal-orders')
  public async findAllByUser(@Query() query: PaginationDto & UserIdDto) {
    const { userId } = query
    return this.orderService.findAll(query, userId)
  }

  @ApiResponse({
    description: 'Update order status'
  })
  @Patch('status/:id')
  public async updateStatus(
      @Param('id') id: string,
      @Body() updateStatusDto: UpdateStatusDto) {
    return this.orderService.update(id, updateStatusDto)
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @UseGuards(RoleGuard(Role.ADMIN))
  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}

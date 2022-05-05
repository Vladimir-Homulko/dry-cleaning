import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Order} from "./entities/order.entity";
import {Model} from "mongoose";
import {ServiceService} from "../service/service.service";
import {ServiceIdDto} from "./dto/service-id.dto";
import {PaginationDto} from "../utils/utils.dto";
import {UserService} from "../user/user.service";

@Injectable()
export class OrderService {

  constructor(
      @InjectModel(Order.name) private orderModel: Model<Order>,
      private readonly serviceService: ServiceService,
      private readonly userService: UserService
  ) {}


  public async create(userId: string, query: ServiceIdDto, createOrderDto: CreateOrderDto) {
    const { serviceId } = query
    if (!serviceId) throw new BadRequestException({ message: 'serviceId is missing!' })

    const user = await this.userService.findById(userId)
    const service = await this.serviceService.findOne(serviceId)

    if (user.balance < service.price) {
      throw new BadRequestException({ message: 'Your balance is low, for this service' })
    }

    const order = new this.orderModel(createOrderDto)
    order.service = service

    return order.save();
  }

  public async findAll(pagination: PaginationDto, userId?: string) {
    const { skip, limit } = pagination

    const query = userId ? this.orderModel.find({ _id: userId }) : this.orderModel.find()

    query.sort({ _id: 1 }).skip(skip)

    if (limit) {
      query.limit(limit)
    }

    return query.exec()
  }

  public async findOne(id: string) {
    if (id.length < 24) {
      throw new BadRequestException({ message: 'id length must be 24 chars' })
    }
    return this.orderModel.findById(id);
  }

  public async update(id: string, updateOrderDto: UpdateOrderDto) {
    if (id.length < 24) {
      throw new BadRequestException({ message: 'id length must be 24 chars' })
    }

    const order = this.orderModel.findByIdAndUpdate(id, updateOrderDto)
    if (!order) {
      throw new NotFoundException({ message: 'order not found' })
    }

    return order;
  }

  public async remove(id: string) {
    return this.orderModel.findByIdAndDelete(id).exec();
  }
}

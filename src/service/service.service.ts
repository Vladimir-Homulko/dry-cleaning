import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Service, ServiceDocument} from "./entities/service.entity";
import { Model } from "mongoose"
import {DryCleaningService} from "../dry-cleaning/dry-cleaning.service";
import {DryCleaningIdDto} from "./dto/dry-cleaning-id.dto";

@Injectable()
export class ServiceService {

  constructor(
      @InjectModel(Service.name) private serviceModel: Model<ServiceDocument>,
      private readonly dryCleaningService: DryCleaningService
  ) {}

  public async create(query: DryCleaningIdDto, createServiceDto: CreateServiceDto): Promise<ServiceDocument> {

    const { dryCleaningId } = query

    if (dryCleaningId.length < 24) {
      throw new BadRequestException({ message: 'id length must be 24 chars' })
    }

    const dryCleaning = await this.dryCleaningService.findById(dryCleaningId);
    const createdService = new this.serviceModel(createServiceDto);

    dryCleaning.services.push(createdService)
    await this.dryCleaningService.update(dryCleaningId, dryCleaning)

    return createdService.save();
  }

  public async findAll(): Promise<ServiceDocument[]> {
    return this.serviceModel.find().exec();
  }

  public async findOne(id: string): Promise<ServiceDocument> {
    if (id.length < 24) {
      throw new BadRequestException({ message: 'id length must be 24 chars' })
    }
    return this.serviceModel.findById(id);
  }

  public async update(id: string, updateServiceDto: UpdateServiceDto): Promise<ServiceDocument> {
    if (id.length < 24) {
      throw new BadRequestException({ message: 'id length must be 24 chars' })
    }

    const service = await this.serviceModel.findByIdAndUpdate(id, updateServiceDto)
    if (!service) throw new NotFoundException({ message: "Service not found" })
    return service
  }

  public async remove(id: string) {
    if (id.length < 24) {
      throw new BadRequestException({ message: 'id length must be 24 chars' })
    }
    return  this.serviceModel.findByIdAndDelete(id);
  }
}

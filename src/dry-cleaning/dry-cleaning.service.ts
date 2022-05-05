import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateDryCleaningDto } from './dto/create-dry-cleaning.dto';
import { UpdateDryCleaningDto } from './dto/update-dry-cleaning.dto';
import {InjectModel} from "@nestjs/mongoose";
import {DryCleaning, DryCleaningDocument, DryCleaningSchema} from "./entities/dry-cleaning.entity";
import {Model} from "mongoose";
import {UserService} from "../user/user.service";
import {CreateServiceDto} from "../service/dto/create-service.dto";

@Injectable()
export class DryCleaningService {

  constructor(
      @InjectModel(DryCleaning.name) private dryCleaningModel: Model<DryCleaning>,
      private readonly userService: UserService
  ) {}

  public async create(createDryCleaningDto: CreateDryCleaningDto, userId: string) {
    const user = await this.userService.findById(userId);
    createDryCleaningDto.user = user
    const newDryCleaning = new this.dryCleaningModel(createDryCleaningDto);
    return newDryCleaning.save();
  }

  public async findAll(): Promise<DryCleaningDocument[]> {
    return this.dryCleaningModel.find().exec();
  }

  public async findById(id: string): Promise<DryCleaningDocument> {
    return this.dryCleaningModel.findById(id).exec();
  }

  public async update(id: string, updateDryCleaningDto: UpdateDryCleaningDto): Promise<DryCleaningDocument> {

    if (id.length < 24) {
      throw new BadRequestException({ message: 'id length must be 24 chars' })
    }

    const dryCleaning = await this.dryCleaningModel.findByIdAndUpdate(id, updateDryCleaningDto)
    if (!dryCleaning) {
      throw new NotFoundException({ message: 'Dry Cleaning not found' })
    }
    return dryCleaning
  }

  public async updatePhotos(userId: { id: string }, files: Array<Express.Multer.File>): Promise<DryCleaningDocument> {
    const { id } = userId

    if (id.length < 24) {
      throw new BadRequestException({ message: 'id length must be 24 chars' })
    }

    const paths = files.map(files => files.path)

    const dryCleaning = await this.findById(id);

    dryCleaning.photos = [
        ...dryCleaning.photos,
        ...paths
    ]

    return this.update(id, dryCleaning)
  }

  public async remove(id: string): Promise<DryCleaningDocument> {
    if (id.length < 24) {
      throw new BadRequestException({ message: 'id length must be 24 chars' })
    }

    return this.dryCleaningModel.findByIdAndDelete(id);
  }
}

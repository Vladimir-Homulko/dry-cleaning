import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./entities/user.entity";
import {Model} from "mongoose";
import {Role} from "../authorization/authorization.constants";
import {PaginationDto} from "../utils/utils.dto";
import {ForgotPasswordDto} from "../authorization/dto/forgot-password.dto";
import {UpdateCurrentUserDto} from "./dto/update-current-user.dto";

@Injectable()
export class UserService {

  constructor(
      @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserDto)
    return createdUser.save();
  }

  public async findAllClients(paginationDto: PaginationDto): Promise<UserDocument[]> {
    const { skip, limit } = paginationDto

    const query = this.userModel
        .find( { role: Role.CLIENT })
        .sort({ _id: 1 })
        .skip(skip)

    if (limit) {
      query.limit(limit)
    }
    return query.exec();
  }

  public async findById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id).exec();
  }

  public async findByIdWithRefresh(id: string): Promise<UserDocument> {
    return this.userModel.findById(id).select('+refresh').exec();
  }

  public async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email })
  }

  public async findByEmailWithPassword(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).select('+password')
  }

  public async updateUserRefresh(id: string): Promise<void> {
    if (id.length < 24) {
      throw new BadRequestException({ message: 'id length must be 24 chars' })
    }

    const user = await this.findById(id)

    if (user.refresh) {
      await this.update(id, { refresh: null })
    }
  }

  public async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {

    if (id.length < 24) {
      throw new BadRequestException({ message: 'id length must be 24 chars' })
    }

    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto)
    if (!user) {
      throw new NotFoundException({ message: 'User not found' })
    }
    return user
  }

  public async updateCurrentUser(id: string, updateUserDto: UpdateCurrentUserDto): Promise<UserDocument> {
    return this.update(id, updateUserDto)
  }

  public async remove(id): Promise<UserDocument> {

    if (id.length < 24) {
      throw new BadRequestException({ message: 'id length must be 24 chars' })
    }

    return this.userModel.findByIdAndDelete(id).exec();
  }
}

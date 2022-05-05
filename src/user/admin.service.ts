import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./entities/user.entity";
import {Model} from "mongoose";
import {CreateAdminDto} from "./dto/create-admin.dto";

@Injectable()
export class AdminService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>
    ) {}

    public async create(createAdminDto: CreateAdminDto): Promise<User> {
        const createdAdmin = new this.userModel(createAdminDto)
        return createdAdmin.save()
    }

}
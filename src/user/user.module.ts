import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./entities/user.entity";
import {AdminService} from "./admin.service";


@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema}])],
  controllers: [UserController],
  providers: [UserService, AdminService],
  exports: [AdminService, UserService]
})
export class UserModule {}

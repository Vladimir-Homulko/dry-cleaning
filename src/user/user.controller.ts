import {Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import RoleGuard from "../common/guards/role.guard";
import {Role} from "../authorization/authorization.constants";
import {PaginationDto} from "../utils/utils.dto";
import {ApiTags} from "@nestjs/swagger";
import {ForgotPasswordDto} from "../authorization/dto/forgot-password.dto";
import {Public} from "../common/decorators/public.decorator";
import {UserDocument} from "./entities/user.entity";
import {GetCurrentUserId} from "../common/decorators/get-current-user-id.decorator";
import {UpdateCurrentUserDto} from "./dto/update-current-user.dto";


@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(RoleGuard(Role.ADMIN))
  @Post()
  public async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @UseGuards(RoleGuard(Role.ADMIN))
  @Get('clients')
  public async getAllClients(@Query() paginationDto: PaginationDto) {
    return this.userService.findAllClients(paginationDto);
  }

  @Patch()
  public async updateCurrentUser(
      @GetCurrentUserId() id: string,
      @Body() updateUserDto: UpdateCurrentUserDto
  ): Promise<UserDocument> {
    return this.userService.updateCurrentUser(id, updateUserDto)
  }

  @UseGuards(RoleGuard(Role.ADMIN))
  @Patch(':id')
  public async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(RoleGuard(Role.ADMIN))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}

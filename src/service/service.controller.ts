import {Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards} from '@nestjs/common';
import {ServiceService} from './service.service';
import {CreateServiceDto} from './dto/create-service.dto';
import {UpdateServiceDto} from './dto/update-service.dto';
import {ApiTags} from "@nestjs/swagger";
import RoleGuard from "../common/guards/role.guard";
import {Role} from "../authorization/authorization.constants";
import {ServiceDocument} from "./entities/service.entity";
import {DryCleaningIdDto} from "./dto/dry-cleaning-id.dto";

@ApiTags('service')
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @UseGuards(RoleGuard(Role.ADMIN))
  @Post()
  public async create(
      @Query() query: DryCleaningIdDto,
      @Body() createServiceDto: CreateServiceDto
  ): Promise<ServiceDocument> {
    return this.serviceService.create(query, createServiceDto);
  }

  @UseGuards(RoleGuard(Role.ADMIN))
  @Get()
  public async findAll() {
    return this.serviceService.findAll();
  }

  @UseGuards(RoleGuard(Role.ADMIN))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(id);
  }

  @UseGuards(RoleGuard(Role.ADMIN))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.update(id, updateServiceDto);
  }

  @UseGuards(RoleGuard(Role.ADMIN))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceService.remove(id);
  }
}

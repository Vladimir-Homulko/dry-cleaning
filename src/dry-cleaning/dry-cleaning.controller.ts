import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  StreamableFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {DryCleaningService} from './dry-cleaning.service';
import {CreateDryCleaningDto} from './dto/create-dry-cleaning.dto';
import {UpdateDryCleaningDto} from './dto/update-dry-cleaning.dto';
import {FilesInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import * as path from "path";
import {v4 as uuidv4} from 'uuid';
import {DryCleaningDocument} from "./entities/dry-cleaning.entity";
import {ApiTags} from "@nestjs/swagger";
import {GetCurrentUserId} from "../common/decorators/get-current-user-id.decorator";
import RoleGuard from "../common/guards/role.guard";
import {Role} from "../authorization/authorization.constants";
import {PathDto} from "./dto/path.dto";
import {createReadStream} from "fs";
import {CreateServiceDto} from "../service/dto/create-service.dto";

@ApiTags('dry-cleaning')
@Controller('dry-cleaning')
export class DryCleaningController {
  constructor(private readonly dryCleaningService: DryCleaningService) {}

  @UseGuards(RoleGuard(Role.ADMIN))
  @Post()
  public async create(
      @Body() createDryCleaningDto: CreateDryCleaningDto,
      @GetCurrentUserId() userId: string
  ): Promise<DryCleaningDocument> {
    return this.dryCleaningService.create(createDryCleaningDto, userId);
  }

  @Get('photo')
  public async getDryCleaningPhotos(@Query() pathDto: PathDto): Promise<StreamableFile> {
    const file = createReadStream(path.join(process.cwd(), pathDto.path))
    return new StreamableFile(file)
  }

  @Get()
  public async findAll() {
    return this.dryCleaningService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.dryCleaningService.findById(id);
  }

  @UseGuards(RoleGuard(Role.ADMIN))
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() updateDryCleaningDto: UpdateDryCleaningDto) {
    return this.dryCleaningService.update(id, updateDryCleaningDto);
  }

  @UseGuards(RoleGuard(Role.ADMIN))
  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.dryCleaningService.remove(id);
  }

  @UseGuards(RoleGuard(Role.ADMIN))
  @Post('upload-photos/:id')
  @UseInterceptors(FilesInterceptor('files', 10, {
    storage: diskStorage({
      destination: '.uploads/dry-cleaning-photos',
      filename: (req, file, cb) => {
        const fileName: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4()
        const extension: string = path.parse(file.originalname).ext

        cb(null, `${fileName}${extension}`)
      }
    })
  }))
  public uploadPhotos(
      @Param() id: { id: string },
      @UploadedFiles() files: Array<Express.Multer.File>
  ): Promise<DryCleaningDocument> {
    return this.dryCleaningService.updatePhotos(id, files)
  }


}

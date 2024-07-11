import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UploadedFile,
  Req,
  UseInterceptors,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Roles } from 'src/auth/decorator/role.decorator';
import { RoleEnum } from 'src/common/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'helpers/config';
import { extname } from 'path';
import { FilterUserDto } from './dto/filter-user.dto';
import { Response } from 'express';
import { PublicAPI } from 'src/auth/decorator/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(RoleEnum.ADMIN)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.USER, RoleEnum.PM)
  @Get()
  findAll(@Query() query: FilterUserDto): Promise<UserEntity[]> {
    return this.usersService.findAll(query);
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.USER, RoleEnum.PM)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserEntity> {
    return this.usersService.findOne(id);
  }

  @Roles(RoleEnum.ADMIN)
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.usersService.update(updateUserDto);
  }

  @Roles(RoleEnum.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<UserEntity> {
    return this.usersService.archive(id);
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.USER, RoleEnum.PM)
  @Post('upload-avatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: storageConfig('avatar'),
      fileFilter: (req, file, cb) => {
        const ext = extname(file.originalname);
        const allowedExtArr = ['.jpg', '.png', '.jpeg'];
        if (!allowedExtArr.includes(ext)) {
          req.fileValidationError = `Wrong extension type. Accepted file ext are: ${allowedExtArr.toString()}`;
          cb(null, false);
        } else {
          const fileSize = parseInt(req.headers['content-length']);
          const allowedSize = 1024 * 1024 * 5;
          if (fileSize > allowedSize) {
            req.fileValidationError = `File size is too large. Max file size is ${allowedSize} bytes`;
            cb(null, false);
          } else {
            cb(null, true);
          }
        }
      },
    }),
  )
  uploadAvatar(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
    // console.log(req.user_data.id);
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    return this.usersService.updateAvatar(
      req.user_data.id,
      file.destination + '/' + file.filename,
    );
  }

  @PublicAPI()
  // @Roles(RoleEnum.ADMIN)
  @Post('import-users-from-file')
  @UseInterceptors(
    FileInterceptor('file-excel', {
      storage: storageConfig('excel'),
      fileFilter: (req, file, cb) => {
        const ext = extname(file.originalname);
        const allowedExtArr = ['.xlsx', '.csv'];
        if (!allowedExtArr.includes(ext)) {
          req.fileValidationError = `Wrong extension type. Accepted file ext are: ${allowedExtArr.toString()}`;
          cb(null, false);
        } else {
          cb(null, true);
        }
      },
    }),
  )
  importUsersFromFile(
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    return this.usersService.importUsersFromFile(file);
  }

  // @Roles(RoleEnum.ADMIN)
  @PublicAPI()
  @Get('export-users-to-file')
  exportUsersToFile(@Res() res: Response) {
    return this.usersService.exportUsersToFile(res);
  }
}

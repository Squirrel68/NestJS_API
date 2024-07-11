import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TimesheetsService } from './timesheets.service';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { StatusEnum } from 'src/common/status.enum';
import { Roles } from 'src/auth/decorator/role.decorator';
import { RoleEnum } from 'src/common/role.enum';

@Controller('timesheets')
export class TimesheetsController {
  constructor(private readonly timesheetsService: TimesheetsService) {}

  @Roles(RoleEnum.ADMIN, RoleEnum.USER, RoleEnum.PM)
  @Post()
  create(@Body() createTimesheetDto: CreateTimesheetDto) {
    return this.timesheetsService.create(createTimesheetDto);
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.USER, RoleEnum.PM)
  @Get()
  findAll(@Query('status') status: StatusEnum) {
    return this.timesheetsService.findAll(status);
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.USER, RoleEnum.PM)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timesheetsService.findOne(id);
  }

  @Roles(RoleEnum.USER, RoleEnum.PM)
  @Patch(':id')
  updateWithoutStatus(
    @Param('id') id: string,
    @Body() updateTimesheetDto: UpdateTimesheetDto,
  ) {
    return this.timesheetsService.update(id, updateTimesheetDto);
  }

  @Roles(RoleEnum.PM)
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: StatusEnum) {
    // console.log('status', status);
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.USER, RoleEnum.PM)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timesheetsService.remove(id);
  }
}

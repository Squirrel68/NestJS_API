import { Controller, Get, Post, Body, Query, Req } from '@nestjs/common';
import { TimesheetsService } from './timesheets.service';
import { Roles } from 'src/auth/decorator/role.decorator';
import { RoleEnum } from 'src/common/role.enum';
import { StartEndDateDto } from './dto/start-end-date.dto';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';

@Controller('timesheets')
export class TimesheetsController {
  constructor(private readonly timesheetsService: TimesheetsService) {}

  // My timesheets - For User
  @Roles(RoleEnum.USER, RoleEnum.ADMIN, RoleEnum.PM)
  @Get()
  getTimesheetByUserId(@Req() req: Request, @Query() query: StartEndDateDto) {
    return this.timesheetsService.findMyTimesheetByDay(req, query);
  }

  @Roles(RoleEnum.USER, RoleEnum.ADMIN, RoleEnum.PM)
  @Post()
  create(@Req() req: any, @Body() createTimesheetDto: CreateTimesheetDto) {
    return this.timesheetsService.createTimesheetByDay(req, createTimesheetDto);
  }

  @Roles(RoleEnum.USER, RoleEnum.ADMIN, RoleEnum.PM)
  @Post('submit-to-pending')
  submitToPending(@Req() req: any, @Body() startEndDateDto: StartEndDateDto) {
    return this.timesheetsService.submitToPending(req, startEndDateDto);
  }

  // timesheet for PM
  // @Roles(RoleEnum.PM)
  // @Get('get-all')
  // getTimesheetByStatus() {
  //   // return this.timesheetsService.findMyTimesheets();
  // }

  // @Roles(RoleEnum.PM)
  // @Post('approve-timesheet')
  // approveTimesheet(@Body() createTimesheetDto: CreateTimesheetDto) {
  //   return this.timesheetsService.approveTimesheet(createTimesheetDto);
  // }
}

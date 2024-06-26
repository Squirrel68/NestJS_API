import { Module } from '@nestjs/common';
import { TimesheetsService } from './timesheets.service';
import { TimesheetsController } from './timesheets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimesheetEntity } from './entities/timesheet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TimesheetEntity])],
  controllers: [TimesheetsController],
  providers: [TimesheetsService],
})
export class TimesheetsModule {}

import { Module } from '@nestjs/common';
import { TimesheetsService } from './timesheets.service';
import { TimesheetsController } from './timesheets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimesheetEntity } from './entities/timesheet.entity';
import { ProjectsModule } from 'src/projects/projects.module';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TimesheetEntity]),
    ProjectsModule,
    TasksModule,
  ],
  controllers: [TimesheetsController],
  providers: [TimesheetsService],
})
export class TimesheetsModule {}

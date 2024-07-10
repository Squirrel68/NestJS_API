import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TimesheetEntity } from './entities/timesheet.entity';
import { Repository, Timestamp } from 'typeorm';
import { StatusEnum } from 'src/common/status.enum';
import { IsActive } from 'src/common/is-active.enum';
import { StartEndDateDto } from './dto/start-end-date.dto';
import { ProjectsService } from 'src/projects/projects.service';
import { TasksService } from 'src/tasks/tasks.service';
import { startOfDay, endOfDay } from 'date-fns';

@Injectable()
export class TimesheetsService {
  constructor(
    @InjectRepository(TimesheetEntity)
    private timesheetRepository: Repository<TimesheetEntity>,
    private projectsService: ProjectsService,
    private tasksService: TasksService,
  ) {}

  async createTimesheetByDay(req: any, createTimesheetDto: CreateTimesheetDto) {
    const user = req.user;
    const { project_id, task_id } = createTimesheetDto;
    const project = await this.projectsService.findOne(project_id);
    const task = await this.tasksService.findOne(task_id);

    return await this.timesheetRepository.save({
      ...createTimesheetDto,
      user,
      project,
      task,
    });
  }

  async findMyTimesheetByDay(req: any, query: StartEndDateDto) {
    // 1.fetch User from token, date from params
    const user_id = req.user_data.id;
    const date = new Date(query.date);
    const start_of_date = startOfDay(date);
    const end_of_date = endOfDay(date);
    // 2.fetch timesheet by user_id and date
    const sql = this.timesheetRepository
      .createQueryBuilder('timesheet')
      .leftJoinAndSelect('timesheet.user', 'user')
      .where('user.id = :user_id', { user_id })
      .andWhere(
        'timesheet.created_at BETWEEN :start_of_date AND :end_of_date',
        { start_of_date, end_of_date },
      );
    const timesheet = await sql.getOne();
    if (!timesheet) {
      throw new NotFoundException('Timesheet not found');
    }
    return timesheet;
  }

  async submitToPending(req, startEndDateDto: StartEndDateDto) {
    const user_id = req.user_data.id;
    const { start_date, end_date } = startEndDateDto;
    const start = startOfDay(new Date(start_date));
    const end = endOfDay(new Date(end_date));
    //1. update all timesheet of user_id, start_date, end_date from new to pending
    const sql = this.timesheetRepository
      .createQueryBuilder('timesheet')
      .leftJoinAndSelect('timesheet.user', 'user')
      .where('user.id = :user_id', { user_id })
      .andWhere('timesheet.created_at BETWEEN :start AND :end', { start, end });
    const timesheets = await sql.getMany();
    if (!timesheets || timesheets.length === 0) {
      throw new NotFoundException('Timesheet not found');
    }
    timesheets.forEach((timesheet) => {
      timesheet.status = StatusEnum.PENDING;
      this.timesheetRepository.save(timesheet);
    });
    return {
      message: `Submitted ${timesheets.length} timesheet`,
      data: timesheets,
    };
  }

  async getByStatus(query: StartEndDateDto) {
    const status = query.status;
    const timesheets = await this.timesheetRepository.find({
      where: { status },
    });

    if (!timesheets || timesheets.length === 0) {
      throw new NotFoundException('Timesheet not found');
    }
    return timesheets;
  }

  async approveTimesheet(body: StartEndDateDto) {
    const { start_date, end_date } = body;
    const start = startOfDay(new Date(start_date));
    const end = endOfDay(new Date(end_date));
    //1. update all timesheet of user_id, start_date, end_date from new to pending
    const sql = this.timesheetRepository
      .createQueryBuilder('timesheet')
      .leftJoinAndSelect('timesheet.user', 'user')
      .andWhere('timesheet.created_at BETWEEN :start AND :end', { start, end });
    const timesheets = await sql.getMany();
    if (!timesheets || timesheets.length === 0) {
      throw new NotFoundException('Timesheet not found');
    }
    timesheets.forEach((timesheet) => {
      timesheet.status = StatusEnum.APPROVED;
      this.timesheetRepository.save(timesheet);
    });
    return {
      message: `Approved ${timesheets.length} timesheet`,
      data: timesheets,
    };
  }
}

import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TimesheetEntity } from './entities/timesheet.entity';
import { Repository } from 'typeorm';
import { StatusEnum } from 'src/common/status.enum';
import { IsActive } from 'src/common/is-active.enum';

@Injectable()
export class TimesheetsService {
  constructor(
    @InjectRepository(TimesheetEntity)
    private timesheetRepository: Repository<TimesheetEntity>,
  ) {}

  async create(createTimesheetDto: CreateTimesheetDto) {
    const timesheet = this.timesheetRepository.create(createTimesheetDto);
    await this.timesheetRepository.save(timesheet);
    return timesheet;
  }

  async findAll(@Query('status') status: StatusEnum) {
    const query = this.timesheetRepository.createQueryBuilder('timesheet');
    if (status) {
      query.andWhere('timesheet.status = :status', { status });
    }
    const timesheets = await query.getMany();
    if (timesheets.length === 0) {
      throw new NotFoundException('No timesheets found');
    }
    return timesheets;
  }

  async findOne(id: string) {
    const query = this.timesheetRepository
      .createQueryBuilder('timesheet')
      .where('timesheet.id = :id', { id });
    const timesheet = await query.getOne();
    if (!timesheet) {
      throw new NotFoundException(`Timesheet with ID "${id}" not found`);
    }
    return timesheet;
  }

  async update(id: string, updateTimesheetDto: UpdateTimesheetDto) {
    const timesheet = await this.findOne(id);
    this.timesheetRepository.merge(timesheet, updateTimesheetDto);
    await this.timesheetRepository.save(timesheet);
    return timesheet;
  }

  async remove(id: string) {
    const timesheet = await this.findOne(id);
    timesheet.is_active = IsActive.INACTIVE;
    await this.timesheetRepository.save(timesheet);
    return timesheet;
  }
}

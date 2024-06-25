import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { IsActive } from 'src/common/is-active.enum';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const { name } = createTaskDto;
    const task = this.taskRepository.create({
      name,
      is_active: IsActive.ACTIVE,
    });
    await this.taskRepository.save(task);
    return task;
  }

  async findAll(query: any): Promise<TaskEntity[]> {
    return this.taskRepository.find(query);
  }
}

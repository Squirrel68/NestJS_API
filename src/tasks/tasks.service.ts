import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { IsActive } from 'src/common/is-active.enum';
import { Repository } from 'typeorm';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return await this.taskRepository.save(createTaskDto);
  }

  async findAll(@Query() filterDto: GetTasksFilterDto): Promise<TaskEntity[]> {
    const { is_active, search } = filterDto;
    const query = this.taskRepository.createQueryBuilder('task');

    if (is_active) {
      query.andWhere('task.is_active = :is_active', { is_active });
    }

    if (search) {
      query.andWhere('LOWER(task.name) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    const tasks = await query.getMany();
    if (tasks.length === 0) {
      throw new NotFoundException('No tasks found');
    }
    return tasks;
  }

  async findOne(id: string): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  async update(updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
    return await this.taskRepository.save(updateTaskDto);
  }

  async delete(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async archiveTask(id: string, is_active: IsActive): Promise<TaskEntity> {
    const task = await this.findOne(id);
    task.is_active = is_active;
    return await this.taskRepository.save(task);
  }
}

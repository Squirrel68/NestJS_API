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
    const { name } = createTaskDto;
    const task = this.taskRepository.create({
      name,
      is_active: IsActive.ACTIVE,
    });
    await this.taskRepository.save(task);
    return task;
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
    const query = this.taskRepository
      .createQueryBuilder('task')
      .where('task.id = :id', { id });
    const task = await query.getOne();
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
    const { name, is_active } = updateTaskDto;
    const task = await this.findOne(id);
    task.name = name;
    task.is_active = is_active;
    await this.taskRepository.save(task);
    return task;
  }

  async delete(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}

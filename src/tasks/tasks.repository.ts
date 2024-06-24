import { EntityRepository, Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { IsActive } from 'src/common/is-active.enum';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { is_active, search } = filterDto;
    const query = this.createQueryBuilder('task');
    if (is_active) {
      query.andWhere('task.is_active = :is_active', { is_active });
    }
    if (search) {
      query.andWhere('LOWER(task.name) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { name } = createTaskDto;
    const task = this.create({ name, is_active: IsActive.ACTIVE });
    await this.save(task);
    return task;
  }
}

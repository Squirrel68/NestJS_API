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
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { TaskEntity } from './entities/task.entity';
import { Roles } from 'src/auth/decorator/role.decorator';
import { RoleEnum } from 'src/common/role.enum';
import { IsActive } from 'src/common/is-active.enum';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Roles(RoleEnum.ADMIN, RoleEnum.USER, RoleEnum.PM)
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<TaskEntity[]> {
    return this.tasksService.findAll(filterDto);
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.USER, RoleEnum.PM)
  @Get(':id')
  getTask(@Param('id') id: string): Promise<TaskEntity> {
    return this.tasksService.findOne(id);
  }

  @Roles(RoleEnum.ADMIN)
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.tasksService.create(createTaskDto);
  }

  @Roles(RoleEnum.ADMIN)
  @Patch()
  updateTask(@Body() updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
    return this.tasksService.update(updateTaskDto);
  }

  @Roles(RoleEnum.ADMIN)
  @Delete(':id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.delete(id);
  }

  @Roles(RoleEnum.ADMIN)
  @Patch(':id/archive')
  archiveTask(
    @Param('id') id: string,
    @Body() is_active: IsActive,
  ): Promise<TaskEntity> {
    return this.tasksService.archiveTask(id, is_active);
  }
}

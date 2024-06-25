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

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<TaskEntity[]> {
    return this.tasksService.findAll(filterDto);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.tasksService.create(createTaskDto);
  }
}

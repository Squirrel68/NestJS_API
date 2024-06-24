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
import { Task } from './entities/task.entity';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get()
  findAll(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getAll(filterDto);
  }

  @Get('/:id')
  findOne(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Patch('/:id/is_active')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const { is_active } = updateTaskDto;
    return this.tasksService.updateTaskIsActive(id, is_active);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }
}

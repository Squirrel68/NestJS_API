import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsNotEmpty } from 'class-validator';
export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsNotEmpty()
  id: string;
}

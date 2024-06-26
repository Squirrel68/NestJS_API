import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { IsActive } from 'src/common/is-active.enum';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsNotEmpty()
  name: string;

  @IsEnum(IsActive)
  is_active: IsActive;
}

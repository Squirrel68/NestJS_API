import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { IsActive } from 'src/common/is-active.enum';

export class CreateTaskDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  project_id: string;
}

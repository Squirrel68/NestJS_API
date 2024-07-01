import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { StatusEnum } from 'src/common/status.enum';

export class CreateTimesheetDto {
  @IsNotEmpty()
  work_hours: number;

  @IsNotEmpty()
  note: string;

  @IsOptional()
  @IsEnum(StatusEnum)
  status;

  @IsNotEmpty()
  project_id: string;

  @IsNotEmpty()
  task_id: string;

  @IsNotEmpty()
  user_id: string;
}

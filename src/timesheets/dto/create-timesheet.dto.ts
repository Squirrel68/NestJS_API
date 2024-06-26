import { IsNotEmpty, IsOptional } from 'class-validator';
import { StatusEnum } from 'src/common/status.enum';

export class CreateTimesheetDto {
  @IsOptional()
  date_time: Date;

  @IsNotEmpty()
  work_hours: number;

  @IsNotEmpty()
  note: string;

  @IsOptional()
  status: StatusEnum;
}

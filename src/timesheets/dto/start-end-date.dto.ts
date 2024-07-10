import { IsDate, IsDateString, IsEnum, IsOptional } from 'class-validator';
import { StatusEnum } from 'src/common/status.enum';

export class StartEndDateDto {
  @IsOptional()
  @IsDateString()
  start_date: string;

  @IsOptional()
  @IsDateString()
  end_date: string;

  @IsOptional()
  @IsDateString()
  date: string;

  @IsOptional()
  @IsEnum(StatusEnum)
  status: string;
}

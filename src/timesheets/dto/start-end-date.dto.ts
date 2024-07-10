import { IsDate, IsDateString, IsOptional } from 'class-validator';

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
}

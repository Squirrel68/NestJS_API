import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ProjectTypeEnum } from '../entities/project_type.enum';

export class CreateProjectDto {
  @IsNotEmpty()
  name: string;

  @IsEnum(ProjectTypeEnum)
  project_type: ProjectTypeEnum;

  @IsOptional()
  start_date: Date;

  @IsNotEmpty()
  end_date: Date;
}

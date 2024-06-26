import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { IsDate, IsEnum, IsNotEmpty } from 'class-validator';
import { ProjectTypeEnum } from '../entities/project_type.enum';
import { IsActive } from 'src/common/is-active.enum';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @IsNotEmpty()
  name: string;

  @IsEnum(ProjectTypeEnum)
  project_type: ProjectTypeEnum;

  @IsNotEmpty()
  start_date: Date;

  @IsNotEmpty()
  end_date: Date;

  @IsNotEmpty()
  is_active: IsActive;
}

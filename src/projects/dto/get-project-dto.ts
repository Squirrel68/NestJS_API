import { IsEnum, IsOptional, IsString } from 'class-validator';
import { IsActive } from 'src/common/is-active.enum';
import { ProjectTypeEnum } from '../entities/project_type.enum';

export class GetProjectFilterDto {
  @IsOptional()
  @IsEnum(IsActive)
  is_active?: IsActive;

  @IsOptional()
  @IsEnum(ProjectTypeEnum)
  project_type?: ProjectTypeEnum;

  @IsOptional()
  @IsString()
  search?: string;
}

import { IsEnum, IsOptional, IsString } from 'class-validator';
import { IsActive } from 'src/common/is-active.enum';

export class GetClientFilterDto {
  @IsOptional()
  @IsEnum(IsActive)
  is_active?: IsActive;

  @IsOptional()
  @IsString()
  search?: string;
}

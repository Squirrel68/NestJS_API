import { IsOptional } from 'class-validator';

export class FilterUserDto {
  @IsOptional()
  page: string;

  @IsOptional()
  items_per_page: string;

  @IsOptional()
  is_active: string;
}

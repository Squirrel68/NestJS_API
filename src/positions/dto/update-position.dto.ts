import { PartialType } from '@nestjs/mapped-types';
import { CreatePositionDto } from './create-position.dto';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { IsActive } from 'src/common/is-active.enum';

export class UpdatePositionDto extends PartialType(CreatePositionDto) {
  @IsNotEmpty()
  name: string;

  @IsEnum(IsActive)
  is_active: IsActive;
}

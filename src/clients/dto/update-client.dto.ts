import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { IsActive } from 'src/common/is-active.enum';

export class UpdateClientDto extends PartialType(CreateClientDto) {
  @IsEnum(IsActive)
  @IsOptional()
  is_active: IsActive;
}

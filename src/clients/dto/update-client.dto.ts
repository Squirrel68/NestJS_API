import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { IsActive } from 'src/common/is-active.enum';

export class UpdateClientDto extends PartialType(CreateClientDto) {
  @IsNotEmpty()
  id: string;
}

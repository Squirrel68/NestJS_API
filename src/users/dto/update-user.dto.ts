import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { IsActive } from 'src/common/is-active.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  id: string;
}

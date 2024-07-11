import { PartialType } from '@nestjs/swagger';
import { CreateUserProjectDto } from './create-user_project.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserProjectDto extends PartialType(CreateUserProjectDto) {
  @IsNotEmpty()
  id: string;
}

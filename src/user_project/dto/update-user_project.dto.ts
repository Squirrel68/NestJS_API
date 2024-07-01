import { PartialType } from '@nestjs/swagger';
import { CreateUserProjectDto } from './create-user_project.dto';

export class UpdateUserProjectDto extends PartialType(CreateUserProjectDto) {}

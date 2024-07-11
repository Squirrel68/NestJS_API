import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { UserProjectRoleEnum } from 'src/common/user-project-role.enum';

export class CreateUserProjectDto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  project_id: string;

  @IsOptional()
  @IsEnum(UserProjectRoleEnum)
  role: string;
}

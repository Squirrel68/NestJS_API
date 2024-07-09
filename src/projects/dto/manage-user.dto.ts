import { IsNotEmpty } from 'class-validator';

export class ManageUsersDto {
  @IsNotEmpty()
  project_id: string;

  @IsNotEmpty()
  user_project_id: string;
}

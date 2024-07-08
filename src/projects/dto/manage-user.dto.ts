import { IsNotEmpty } from 'class-validator';

export class ManageUserDto {
  @IsNotEmpty()
  project_id: string;

  @IsNotEmpty()
  user_id: string;
}

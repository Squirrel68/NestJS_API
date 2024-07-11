import { IsNotEmpty } from 'class-validator';

export class ManageTasksDto {
  @IsNotEmpty()
  project_id: string;

  @IsNotEmpty()
  task_id: string;
}

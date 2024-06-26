import { IsNotEmpty } from 'class-validator';

export class CreateBranchDto {
  @IsNotEmpty()
  name: string;
}

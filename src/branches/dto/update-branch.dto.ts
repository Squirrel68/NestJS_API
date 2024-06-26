import { PartialType } from '@nestjs/mapped-types';
import { CreateBranchDto } from './create-branch.dto';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { IsActive } from 'src/common/is-active.enum';

export class UpdateBranchDto extends PartialType(CreateBranchDto) {
  @IsNotEmpty()
  name: string;

  @IsEnum(IsActive)
  is_active: IsActive;
}

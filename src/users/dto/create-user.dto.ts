import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { LevelEnum } from 'src/common/level.enum';
import { RoleEnum } from 'src/common/role.enum';
import { SexEnum } from 'src/common/sex.enum';
import { UserTypeEnum } from 'src/common/user-type.enum';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  identify: string;
  @IsNotEmpty()
  fullname: string;
  @IsNotEmpty()
  @IsEnum(SexEnum)
  sex: SexEnum;
  @IsNotEmpty()
  dob: Date;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  phone_number: string;
  @IsNotEmpty()
  emergency_contact: string;
  @IsNotEmpty()
  place_of_origin: string;
  @IsNotEmpty()
  place_of_residence: string;
  @IsNotEmpty()
  current_address: string;

  @IsOptional()
  start_date: Date;
  @IsEnum(UserTypeEnum)
  user_type: UserTypeEnum;
  @IsEnum(RoleEnum)
  role: RoleEnum;

  @IsNotEmpty()
  bankID: string;
  @IsNotEmpty()
  taxID: string;
  @IsOptional()
  basic_trainer_id: string;
  @IsEnum(LevelEnum)
  level: LevelEnum;

  @IsNotEmpty({ message: 'Branch ID is required' })
  @IsString({ message: 'Branch ID must be a string' })
  branch_id: string;

  @IsNotEmpty()
  position_id: string;
}

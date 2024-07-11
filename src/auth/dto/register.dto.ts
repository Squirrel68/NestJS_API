import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { LevelEnum } from 'src/common/level.enum';
import { RoleEnum } from 'src/common/role.enum';
import { SexEnum } from 'src/common/sex.enum';
import { UserTypeEnum } from 'src/common/user-type.enum';

export class RegisterUserDto {
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
  @IsNotEmpty()
  bankID: string;
  @IsNotEmpty()
  taxID: string;
  @IsNotEmpty()
  basic_trainer_id: string;
  @IsEnum(LevelEnum)
  level: LevelEnum;

  @IsNotEmpty()
  branch_id: string;

  @IsNotEmpty()
  position_id: string;
}

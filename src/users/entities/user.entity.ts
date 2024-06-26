import { BaseEntity } from 'src/common/base.entity';
import { LevelEnum } from 'src/common/level.enum';
import { RoleEnum } from 'src/common/role.enum';
import { SexEnum } from 'src/common/sex.enum';
import { UserTypeEnum } from 'src/common/user-type.enum';
import { Column, Entity } from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  identify: string;
  @Column()
  fullname: string;
  @Column()
  sex: SexEnum;
  @Column()
  dob: Date;
  @Column()
  email: string;
  @Column()
  phone_number: string;
  @Column()
  emergency_contact: string;
  @Column()
  place_of_origin: string;
  @Column()
  place_of_residence: string;
  @Column()
  current_address: string;
  @Column()
  start_date: Date;
  @Column({ default: UserTypeEnum.INTERN })
  user_type: UserTypeEnum;
  @Column({ default: RoleEnum.USER })
  role: RoleEnum;
  @Column()
  bankID: string;
  @Column()
  taxID: string;
  @Column()
  basic_trainer_id: string;
  @Column()
  level: LevelEnum;
}

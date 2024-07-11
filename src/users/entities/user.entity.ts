import { BranchEntity } from 'src/branches/entities/branch.entity';
import { BaseEntity } from 'src/common/base.entity';
import { RoleEnum } from 'src/common/role.enum';
import { UserTypeEnum } from 'src/common/user-type.enum';
import { PositionEntity } from 'src/positions/entities/position.entity';
import { TimesheetEntity } from 'src/timesheets/entities/timesheet.entity';
import { UserProjectEntity } from 'src/user_project/entities/user_project.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

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
  sex: string;
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
  user_type: string;
  @Column({ default: RoleEnum.USER })
  role: string;
  @Column()
  bankID: string;
  @Column()
  taxID: string;
  @Column()
  level: string;

  @Column({ nullable: true, default: null })
  refresh_token: string;
  @Column({ nullable: true, default: null })
  avatar: string;

  @OneToMany(() => UserProjectEntity, (userProject) => userProject.user)
  userProjects: UserProjectEntity[];

  @OneToMany(() => TimesheetEntity, (timesheet) => timesheet.user)
  timesheets: TimesheetEntity[];

  @ManyToOne(() => BranchEntity, (branch) => branch.users)
  @JoinColumn({ name: 'branch_id', referencedColumnName: 'id' })
  branch: BranchEntity;

  @ManyToOne(() => PositionEntity, (position) => position.users)
  @JoinColumn({ name: 'position_id', referencedColumnName: 'id' })
  position: PositionEntity;

  @ManyToOne(() => UserEntity, (user) => user.homies)
  @JoinColumn({ name: 'basic_trainer_id', referencedColumnName: 'id' })
  trainer: UserEntity;

  @OneToMany(() => UserEntity, (user) => user.trainer)
  homies: UserEntity[];
}

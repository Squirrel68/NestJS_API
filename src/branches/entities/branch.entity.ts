import { BaseEntity } from 'src/common/base.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class BranchEntity extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => UserEntity, (user) => user.branch)
  users: UserEntity[];
}

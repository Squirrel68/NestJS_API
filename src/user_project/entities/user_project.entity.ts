import { BaseEntity } from 'src/common/base.entity';
import { UserProjectRoleEnum } from 'src/common/user-project-role.enum';
import { ProjectEntity } from 'src/projects/entities/project.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class UserProjectEntity extends BaseEntity {
  @Column({ default: UserProjectRoleEnum.DEV })
  role: string;

  @ManyToOne(() => UserEntity, (user) => user.userProjects)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.userProjects)
  @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
  project: ProjectEntity;
}

import { BaseEntity } from 'src/common/base.entity';
import { StatusEnum } from 'src/common/status.enum';
import { ProjectEntity } from 'src/projects/entities/project.entity';
import { TaskEntity } from 'src/tasks/entities/task.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class TimesheetEntity extends BaseEntity {
  @Column({ type: 'float' })
  work_hours: number;

  @Column()
  note: string;

  @Column({ default: StatusEnum.NEW })
  status: string;

  @ManyToOne(() => UserEntity, (user) => user.timesheets)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.timesheets)
  @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
  project: ProjectEntity;

  @ManyToOne(() => TaskEntity, (task) => task.timesheets)
  @JoinColumn({ name: 'task_id', referencedColumnName: 'id' })
  task: TaskEntity;
}

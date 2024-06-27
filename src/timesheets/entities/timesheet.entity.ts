import { BaseEntity } from 'src/common/base.entity';
import { StatusEnum } from 'src/common/status.enum';
import { ProjectEntity } from 'src/projects/entities/project.entity';
import { TaskEntity } from 'src/tasks/entities/task.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class TimesheetEntity extends BaseEntity {
  @Column()
  date_time: Date;

  @Column()
  work_hours: number;

  @Column()
  note: string;

  @Column({ default: StatusEnum.PENDING })
  status: string;

  @ManyToOne(() => ProjectEntity, (project) => project.timesheets)
  @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
  project: ProjectEntity;

  @ManyToOne(() => TaskEntity, (task) => task.timesheets)
  @JoinColumn({ name: 'task_id', referencedColumnName: 'id' })
  task: TaskEntity;
}

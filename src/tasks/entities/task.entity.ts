import { BaseEntity } from 'src/common/base.entity';
import { ProjectEntity } from 'src/projects/entities/project.entity';
import { TimesheetEntity } from 'src/timesheets/entities/timesheet.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class TaskEntity extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => ProjectEntity, (project) => project.tasks)
  @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
  project: ProjectEntity;

  @OneToMany(() => TimesheetEntity, (timesheet) => timesheet.task)
  timesheets: TimesheetEntity[];
}

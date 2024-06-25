import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class TaskEntity extends BaseEntity {
  @Column()
  name: string;
  // @ManyToOne(() => Project, (project) => project.tasks)
  // project: Project;

  // @OneToMany(() => Timesheet, (timesheet) => timesheet.task)
  // timesheets: Timesheet[];
}

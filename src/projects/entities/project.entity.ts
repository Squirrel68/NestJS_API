import { ProjectTypeEnum } from 'src/projects/entities/project_type.enum';
import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ClientEntity } from 'src/clients/entities/client.entity';
import { TaskEntity } from 'src/tasks/entities/task.entity';
import { TimesheetEntity } from 'src/timesheets/entities/timesheet.entity';

@Entity()
export class ProjectEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  project_type: ProjectTypeEnum;

  @Column()
  start_date: Date = new Date();

  @Column()
  end_date: Date;

  @ManyToOne(() => ClientEntity, (client) => client.projects)
  @JoinColumn({ name: 'client_id', referencedColumnName: 'id' })
  client: ClientEntity;

  @OneToMany(() => TaskEntity, (task) => task.project)
  tasks: TaskEntity[];

  @OneToMany(() => TimesheetEntity, (timesheet) => timesheet.project)
  timesheets: TimesheetEntity[];
}

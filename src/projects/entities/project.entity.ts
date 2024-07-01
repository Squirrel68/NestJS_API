import { ProjectTypeEnum } from 'src/projects/entities/project_type.enum';
import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ClientEntity } from 'src/clients/entities/client.entity';
import { TaskEntity } from 'src/tasks/entities/task.entity';
import { TimesheetEntity } from 'src/timesheets/entities/timesheet.entity';
import { UserProjectEntity } from 'src/user_project/entities/user_project.entity';

@Entity()
export class ProjectEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  project_type: string;

  @Column()
  start_date: Date = new Date();

  @Column()
  end_date: Date;

  @ManyToOne(() => ClientEntity, (client) => client.projects)
  @JoinColumn({ name: 'client_id', referencedColumnName: 'id' })
  client: ClientEntity;

  @OneToMany(() => UserProjectEntity, (userProject) => userProject.project)
  userProjects: UserProjectEntity[];

  @OneToMany(() => TaskEntity, (task) => task.project)
  tasks: TaskEntity[];

  @OneToMany(() => TimesheetEntity, (timesheet) => timesheet.project)
  timesheets: TimesheetEntity[];
}

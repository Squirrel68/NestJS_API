import { Task } from 'src/tasks/entities/task.entity';
import { Timesheet } from 'src/timesheets/entities/timesheet.entity';
import { Entity, OneToMany } from 'typeorm';

@Entity()
export class Project {
  // @OneToMany(() => Task, (task) => task.project)
  // tasks: Task[];
  // @OneToMany(() => Timesheet, (timesheet) => timesheet.project)
  // timesheets: Timesheet[];
}

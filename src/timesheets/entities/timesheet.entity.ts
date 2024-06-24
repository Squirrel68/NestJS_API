import { Project } from 'src/projects/entities/project.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Timesheet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date_time: Date;

  @Column()
  work_hours: number;

  @Column()
  note: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  })
  status;
  // @ManyToOne(() => Task, (task) => task.timesheets)
  // task: Task;
  // @ManyToOne(() => Project, (project) => project.timesheets)
  // project: Project;
}

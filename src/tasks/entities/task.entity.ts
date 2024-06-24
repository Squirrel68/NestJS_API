import { IsActive } from 'src/common/is-active.enum';
import { Project } from 'src/projects/entities/project.entity';
import { Timesheet } from 'src/timesheets/entities/timesheet.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  is_active: IsActive; // for soft delete (for archive and filter)

  // @ManyToOne(() => Project, (project) => project.tasks)
  // project: Project;

  // @OneToMany(() => Timesheet, (timesheet) => timesheet.task)
  // timesheets: Timesheet[];
}

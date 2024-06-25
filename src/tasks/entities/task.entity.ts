import { BaseEntity } from 'src/common/base.entity';
import { IsActive } from 'src/common/is-active.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TaskEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  is_active: IsActive; // for soft delete (for archive and filter)

  // @ManyToOne(() => Project, (project) => project.tasks)
  // project: Project;

  // @OneToMany(() => Timesheet, (timesheet) => timesheet.task)
  // timesheets: Timesheet[];
}

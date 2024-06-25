import { ProjectTypeEnum } from 'src/projects/entities/project_type.enum';
import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity } from 'typeorm';

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
}

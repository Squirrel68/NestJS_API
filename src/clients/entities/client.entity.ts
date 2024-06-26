import { BaseEntity } from 'src/common/base.entity';
import { ProjectEntity } from 'src/projects/entities/project.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class ClientEntity extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => ProjectEntity, (project) => project.client)
  projects: ProjectEntity[];
}

import { ProjectTypeEnum } from 'src/projects/entities/project_type.enum';
import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ClientEntity } from 'src/clients/entities/client.entity';

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
  @JoinColumn({ name: 'client_id' })
  client: ClientEntity;

  @Column({ name: 'client_id' })
  id: string; // this is the name of column id in clientEntity
}

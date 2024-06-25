import { BaseEntity } from 'src/common/base.entity';
import { IsActive } from 'src/common/is-active.enum';
import { Column, Entity } from 'typeorm';

@Entity()
export class ClientEntity extends BaseEntity {
  @Column()
  name: string;
}

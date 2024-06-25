import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class BranchEntity extends BaseEntity {
  @Column()
  name: string;
}

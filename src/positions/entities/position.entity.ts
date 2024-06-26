import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class PositionEntity extends BaseEntity {
  @Column()
  name: string;
}

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Timestamp;

  @UpdateDateColumn()
  updated_at: Timestamp;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ETaskStatus } from './task-status.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: ETaskStatus,
    default: ETaskStatus.OPEN,
  })
  status: ETaskStatus;
}

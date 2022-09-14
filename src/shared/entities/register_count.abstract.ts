import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class RegisterCount {
  @PrimaryGeneratedColumn('identity', { type: 'bigint' })
  id: number;

  @Column('integer', { nullable: true })
  count?: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;
}

import { Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export abstract class Register {
  @PrimaryGeneratedColumn('identity', { type: 'bigint' })
  id: number;

  @Column('text', { unique: true })
  phone: string;

  @Column('text', { nullable: true })
  region: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;
}

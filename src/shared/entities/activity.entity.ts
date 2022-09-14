import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('activity')
export class Activity {
  @PrimaryGeneratedColumn('identity', { type: 'bigint' })
  id: number;

  @Column('character varying', { unique: true })
  slug: string;

  @Column('character varying')
  name: string;

  @Column('timestamp with time zone')
  end_date: Date;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;
}

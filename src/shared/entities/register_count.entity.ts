import { Entity } from 'typeorm';
import { RegisterCount as RegisterCountAbstract } from '@wanin/shared/entities/register_count.abstract';

@Entity('register_count')
export class RegisterCount extends RegisterCountAbstract {}

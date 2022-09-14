import { Entity } from 'typeorm';
import { Register as RegisterAbstract } from '@wanin/shared/entities/register.abstract';

@Entity('register')
export class Register extends RegisterAbstract {}

import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import type { Email } from '@wanin/shared/types/email';

export class EmailDto {
  @IsEmail()
  @ApiProperty()
  email: Email;
}

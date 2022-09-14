import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsString()
  @Length(3, 20)
  @ApiProperty()
  phone: string;
}

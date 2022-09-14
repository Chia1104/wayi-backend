import { IsInt, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRegisterCountDto {
  @IsInt()
  @Min(1)
  @Max(999999)
  @ApiProperty()
  count: number;
}

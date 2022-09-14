import { IsString, Length, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateActivityDto {
  @IsString()
  @Length(1, 50)
  @IsOptional()
  @ApiProperty({ required: false })
  name?: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ required: false })
  end_date?: Date;
}

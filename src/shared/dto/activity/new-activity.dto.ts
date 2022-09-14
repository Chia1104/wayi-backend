import { IsString, Length, IsDateString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NewActivityDto {
  @IsString()
  @Length(1, 50)
  @ApiProperty()
  name: string;

  @IsString()
  @Length(1, 20)
  @Matches(/^[a-z0-9]+(?:_[a-z0-9]+)*$/, {
    message: 'Slug must be in snake_case',
  })
  @ApiProperty()
  slug: string;

  @IsDateString()
  @ApiProperty()
  end_date: Date;
}

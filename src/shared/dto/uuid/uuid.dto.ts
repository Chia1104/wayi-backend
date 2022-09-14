import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import type { UUID } from '@wanin/shared/types/uuid';

export class UUIDDto {
  @IsUUID()
  @ApiProperty()
  uuid: UUID;
}

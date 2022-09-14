import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Activity } from '@wanin/shared/entities';
import { ActivityService } from './services';
import { ActivityController } from './controllers';
import { ActivityRepository } from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature([Activity]), HttpModule],
  providers: [ActivityService, ActivityRepository],
  controllers: [ActivityController],
  exports: [ActivityService],
})
export class ActivityModule {}

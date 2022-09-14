import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterCount } from '@wanin/shared/entities';
import { RegisterCountService } from './services';
import { RegisterCountController } from './controllers';

@Module({
  imports: [TypeOrmModule.forFeature([RegisterCount])],
  providers: [RegisterCountService],
  controllers: [RegisterCountController],
  exports: [RegisterCountService],
})
export class RegisterCountModule {}

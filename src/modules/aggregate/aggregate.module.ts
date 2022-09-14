import { Module } from '@nestjs/common';
import { AggregateService } from './services';
import { RegisterModule, RegisterCountModule } from '@wanin/modules';
import { AggregateController } from './controllers';

@Module({
  imports: [RegisterModule, RegisterCountModule],
  providers: [AggregateService],
  controllers: [AggregateController],
})
export class AggregateModule {}

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterController } from './controllers';
import { RegisterService } from './services';
import { Register } from '@wanin/shared/entities';
import { ActivityModule } from '@wanin/modules';

@Module({
  imports: [
    TypeOrmModule.forFeature([Register]),
    forwardRef(() => ActivityModule),
  ],
  controllers: [RegisterController],
  providers: [RegisterService],
  exports: [RegisterService],
})
export class RegisterModule {}

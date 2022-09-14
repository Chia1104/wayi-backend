import { Module } from '@nestjs/common';
import { RegisterModule } from '../register';
import { FileService } from './services';
import { FileController } from './controllers';
import { FileRepository } from './repositories';

@Module({
  imports: [RegisterModule],
  providers: [FileService, FileRepository],
  controllers: [FileController],
})
export class FileModule {}

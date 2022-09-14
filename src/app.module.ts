import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import {
  RegisterModule,
  FileModule,
  ActivityModule,
  RegisterCountModule,
  AuthModule,
  AggregateModule,
  TenancyModule,
  HealthCheckModule,
} from './modules';
import { typeOrmAsyncConfig } from '@wanin/db/typeorm.config';
import { ThrottlerModule } from '@nestjs/throttler';
import { THROTTLE_TTL, THROTTLE_LIMIT } from '@wanin/shared/constants';
import { TenancyMiddleware } from '@wanin/commons/middlewares';
import { RegisterController } from '@wanin/modules/register/controllers';
import { AggregateController } from '@wanin/modules/aggregate/controllers';
import { FileController } from '@wanin/modules/file/controllers';
import { RegisterCountController } from '@wanin/modules/register-count/controllers';

@Module({
  imports: [
    // Setup environment variables
    ConfigModule.forRoot(),
    // Connect to the database using TypeORM.
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    RegisterModule,
    FileModule,
    ActivityModule,
    RegisterCountModule,
    AuthModule,
    AggregateModule,
    TenancyModule,
    ThrottlerModule.forRoot({
      ttl: THROTTLE_TTL,
      limit: THROTTLE_LIMIT,
    }),
    HealthCheckModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenancyMiddleware)
      .forRoutes(
        RegisterController,
        AggregateController,
        FileController,
        RegisterCountController,
      );
  }
}

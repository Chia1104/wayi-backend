import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  TypeOrmHealthIndicator,
  DiskHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import {
  HEALTH_CHECK_DISK_PATH,
  HEALTH_CHECK_DISK_THRESHOLD,
  HASURA_API,
  HASURA_PORT,
  HASURA_ADMIN_SECRET,
  HEALTH_CHECK_MEMORY_HEAP,
  HEALTH_CHECK_MEMORY_RSS,
} from '@wanin/shared/constants';
import { FirebaseAuthGuard } from '@wanin/commons/guards';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TimeoutInterceptor } from '@wanin/commons/interceptors';

@Controller('api/health-check')
@ApiTags('Health check')
@UseInterceptors(TimeoutInterceptor)
@ApiBearerAuth()
@UseGuards(FirebaseAuthGuard)
export class HealthCheckController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly db: TypeOrmHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
  ) {}

  @Get('/postgres')
  @ApiOperation({ summary: 'Check postgres health' })
  @HealthCheck()
  check() {
    return this.health.check([() => this.db.pingCheck('database')]);
  }

  @Get('/disk')
  @ApiOperation({ summary: 'Check disk health' })
  @HealthCheck()
  checkDisk() {
    return this.health.check([
      () =>
        this.disk.checkStorage('storage', {
          path: HEALTH_CHECK_DISK_PATH,
          thresholdPercent: HEALTH_CHECK_DISK_THRESHOLD,
        }),
    ]);
  }

  @Get('/memory')
  @ApiOperation({ summary: 'Check memory health' })
  @HealthCheck()
  checkMemory() {
    return this.health.check([
      () => this.memory.checkHeap('memory_heap', HEALTH_CHECK_MEMORY_HEAP),
      () => this.memory.checkRSS('memory_rss', HEALTH_CHECK_MEMORY_RSS),
    ]);
  }

  @Get('/hasura')
  @ApiOperation({ summary: 'Check hasura health' })
  @HealthCheck()
  checkHasura() {
    return this.health.check([
      () =>
        this.http.pingCheck('hasura', `${HASURA_API}:${HASURA_PORT}/healthz`, {
          headers: {
            'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
          },
        }),
    ]);
  }
}

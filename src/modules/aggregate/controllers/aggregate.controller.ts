import {
  Controller,
  Get,
  UseInterceptors,
  NotFoundException,
  UseGuards,
  BadRequestException,
  Headers,
} from '@nestjs/common';
import { AggregateService } from '../services';
import { Result } from '@wanin/shared/interfaces/result.interface';
import { STATUS } from '@wanin/shared/types/status';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TimeoutInterceptor } from '@wanin/commons/interceptors';
import { FirebaseAuthGuard } from '@wanin/commons/guards';

@Controller('api/aggregate')
@ApiTags('Aggregate')
@UseInterceptors(TimeoutInterceptor)
export class AggregateController {
  constructor(private readonly aggregateService: AggregateService) {}

  @Get('/get-max-register-count')
  @ApiOperation({ summary: 'Get max register count' })
  @ApiResponse({ status: 200, description: 'Get max register count' })
  @ApiResponse({ status: 400 })
  async getMaxRegisterCount(
    @Headers('x-activity-slug') activitySlug: string,
  ): Promise<Result<number>> {
    try {
      const data = await this.aggregateService.getMaxCount();
      return {
        status: STATUS.SUCCESS,
        message: 'Get max register count',
        data,
      };
    } catch (error) {
      throw new NotFoundException({
        status: STATUS.ERROR,
        message: error.message,
      });
    }
  }

  @Get('/get-total-count-group-by-region')
  @ApiBearerAuth()
  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Get total count group by region' })
  @ApiResponse({ status: 200, description: 'Get total count group by region' })
  @ApiResponse({ status: 400 })
  async getTotalCountGroupByRegion(
    @Headers('x-activity-slug') activitySlug: string,
  ): Promise<Result<any>> {
    try {
      const data = await this.aggregateService.getTotalCountGroupByRegion();
      return {
        status: STATUS.SUCCESS,
        message: 'Get total count group by region',
        data,
      };
    } catch (error) {
      throw new BadRequestException({
        status: STATUS.ERROR,
        message: error.message,
      });
    }
  }

  @Get('/get-count-group-by-region-and-week')
  @ApiBearerAuth()
  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Get count group by region and week' })
  @ApiResponse({
    status: 200,
    description: 'Get count group by region and week',
  })
  @ApiResponse({ status: 400 })
  async getCountGroupByRegionAndWeek(
    @Headers('x-activity-slug') activitySlug: string,
  ): Promise<Result<any>> {
    try {
      const data = await this.aggregateService.getCountGroupByRegionAndWeek();
      return {
        status: STATUS.SUCCESS,
        message: 'Get count group by region and week',
        data,
      };
    } catch (error) {
      throw new NotFoundException({
        status: STATUS.ERROR,
        message: error.message,
      });
    }
  }
}

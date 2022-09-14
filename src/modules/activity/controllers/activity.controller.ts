import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  ParseIntPipe,
  NotFoundException,
  BadRequestException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ActivityService } from '../services';
import { NewActivityDto, UpdateActivityDto } from '@wanin/shared/dto/activity';
import { TimeoutInterceptor } from '@wanin/commons/interceptors';
import { Activity } from '@wanin/shared/entities';
import { STATUS } from '@wanin/shared/types/status';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Result } from '@wanin/shared/interfaces/result.interface';
import { FirebaseAuthGuard } from '@wanin/commons/guards';

@Controller('api/activity')
@ApiTags('Activity')
@UseInterceptors(TimeoutInterceptor)
@ApiBearerAuth()
@UseGuards(FirebaseAuthGuard)
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  @ApiOperation({ summary: 'Create activity' })
  @ApiResponse({ status: 201, description: 'Activity created' })
  @ApiResponse({ status: 400, description: 'Activity already exists' })
  @UsePipes(ValidationPipe)
  async createActivity(@Body() activityDto: NewActivityDto): Promise<Result> {
    try {
      return await this.activityService.createActivity(activityDto);
    } catch (error) {
      console.log(error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException({
        status: STATUS.ERROR,
        message: 'Create activity failed, please try again',
      });
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all activities' })
  @ApiResponse({ status: 200, description: 'Get all activities' })
  @ApiResponse({
    status: 400,
    description: 'Get all activities failed, please try again',
  })
  @ApiResponse({ status: 404, description: 'Activity not found' })
  async getAllActivities(): Promise<Result<Activity[]>> {
    try {
      const data = await this.activityService.getAllActivities();
      return {
        status: STATUS.SUCCESS,
        message: 'Get all activities',
        data,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException({
        status: STATUS.ERROR,
        message: 'Get all activities failed, please try again',
      });
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get activity by id' })
  @ApiResponse({ status: 200, description: 'Get activity by id' })
  @ApiResponse({ status: 404, description: 'Activity not found' })
  @ApiResponse({
    status: 400,
    description: 'Get activity failed, please try again',
  })
  @ApiParam({ name: 'id', description: 'Activity id' })
  async getActivityById(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: () =>
          new NotFoundException({
            status: STATUS.ERROR,
            message: 'Activity not found',
          }),
      }),
    )
    id: number,
  ): Promise<Result<Activity>> {
    try {
      const data = await this.activityService.getActivityById(id);
      return {
        status: STATUS.SUCCESS,
        message: 'Activity found',
        data,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException({
        status: STATUS.ERROR,
        message: 'Get activity failed, please try again',
      });
    }
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update activity' })
  @ApiResponse({ status: 201, description: 'Activity updated' })
  @ApiResponse({ status: 404, description: 'Activity not found' })
  @ApiResponse({
    status: 400,
    description: 'Update activity failed, please try again',
  })
  @ApiParam({ name: 'id', description: 'Activity id' })
  @UsePipes(ValidationPipe)
  async updateActivity(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: () =>
          new NotFoundException({
            status: STATUS.ERROR,
            message: 'Activity not found',
          }),
      }),
    )
    id: number,
    @Body() updateActivityDto: UpdateActivityDto,
  ): Promise<Result> {
    try {
      return await this.activityService.updateActivity(id, updateActivityDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException({
        status: STATUS.ERROR,
        message: 'Update activity failed, please try again',
      });
    }
  }
}

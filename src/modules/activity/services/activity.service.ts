import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Activity } from '@wanin/shared/entities';
import type {
  NewActivityDto,
  UpdateActivityDto,
} from '@wanin/shared/dto/activity';
import { ActivityRepository } from '../repositories';
import { STATUS } from '@wanin/shared/types/status';
import { Result } from '@wanin/shared/interfaces/result.interface';
import { getTenantDataSource } from '@wanin/utils/tenancy.utils';
import { HttpService } from '@nestjs/axios';
import {
  HASURA_ADMIN_SECRET,
  HASURA_API,
  HASURA_PORT,
  DB_NAME,
  TIMEOUT_EXCEPTION_TIME,
} from '@wanin/shared/constants';
import type { AxiosResponse } from 'axios';

@Injectable()
export class ActivityService {
  constructor(
    private readonly activityRepository: ActivityRepository,
    private readonly httpService: HttpService,
  ) {}

  trackHasuraTable(activitySlug: string): Promise<AxiosResponse<any[]>> {
    return this.httpService.axiosRef.post(
      `${HASURA_API}:${HASURA_PORT}/v1/metadata`,
      {
        type: 'bulk',
        args: [
          {
            type: 'pg_track_table',
            args: {
              source: DB_NAME,
              schema: activitySlug,
              name: 'register',
            },
          },
          {
            type: 'pg_track_table',
            args: {
              source: DB_NAME,
              schema: activitySlug,
              name: 'register_count',
            },
          },
          {
            type: 'pg_track_table',
            args: {
              source: DB_NAME,
              schema: activitySlug,
              name: 'migrations',
            },
          },
        ],
      },
      {
        timeout: TIMEOUT_EXCEPTION_TIME,
        headers: {
          'content-type': 'application/json',
          'x-hasura-role': 'admin',
          'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
        },
      },
    );
  }

  async getActivityById(id: number): Promise<Activity> {
    const data = await this.activityRepository.getById(id);
    if (!data || data.name === undefined)
      throw new NotFoundException({
        status: STATUS.ERROR,
        message: 'Activity not found',
      });
    return data;
  }

  async getAllActivities(): Promise<Activity[]> {
    const data = await this.activityRepository.repository.find();
    if (!data || data.length === 0)
      throw new NotFoundException({
        status: STATUS.ERROR,
        message: 'Activity not found',
      });
    return data;
  }

  async getActivityBySlug(slug: string): Promise<Activity> {
    const data = await this.activityRepository.getBySlug(slug);
    if (!data || data.name === undefined) return null;
    return data;
  }

  async createActivity(newActivity: NewActivityDto): Promise<Result> {
    const activity = await this.activityRepository.getBySlug(newActivity.slug);
    if (activity)
      throw new BadRequestException({
        status: STATUS.ERROR,
        message: 'Activity already exists',
      });
    const added = await this.activityRepository.repository.save(newActivity);
    if (!added || added.slug === undefined)
      throw new BadRequestException({
        status: STATUS.ERROR,
        message: 'Create activity failed, please try again',
      });
    await this.activityRepository.repository.query(
      `CREATE SCHEMA IF NOT EXISTS ${newActivity.slug}`,
    );

    const tenantDataSource = getTenantDataSource(newActivity.slug);
    await tenantDataSource.initialize();
    await tenantDataSource.runMigrations();
    await tenantDataSource.destroy();

    const tracked = await this.trackHasuraTable(newActivity.slug);
    if (tracked.status !== 200)
      throw new BadRequestException({
        status: STATUS.ERROR,
        message: 'Failed to track table',
      });

    return {
      status: STATUS.SUCCESS,
      message: 'Activity created',
    };
  }

  async updateActivity(
    id: number,
    updateActivityDto: UpdateActivityDto,
  ): Promise<Result> {
    const activity = await this.activityRepository.getById(id);
    if (!activity || activity.name === undefined)
      throw new NotFoundException({
        status: STATUS.ERROR,
        message: 'Activity not found',
      });
    const success = await this.activityRepository.repository.update(
      id,
      updateActivityDto,
    );
    if (success.affected === 0)
      throw new BadRequestException({
        status: STATUS.ERROR,
        message: 'Update activity failed, please try again',
      });
    return {
      status: STATUS.SUCCESS,
      message: 'Activity updated',
    };
  }
}

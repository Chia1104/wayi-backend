import {
  Injectable,
  BadRequestException,
  forwardRef,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { Register } from '@wanin/shared/entities';
import type { RegisterDto } from '@wanin/shared/dto/register';
import { STATUS } from '@wanin/shared/types/status';
import { Result } from '@wanin/shared/interfaces/result.interface';
import { ActivityService } from '@wanin/modules/activity/services';
import { DATASOURCE } from '@wanin/modules/tenancy/tenancy.symbols';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RegisterService {
  constructor(
    @Inject(DATASOURCE)
    private readonly dataSource: DataSource,
    @InjectRepository(Register)
    private readonly registerRepository: Repository<Register>,
    @Inject(forwardRef(() => ActivityService))
    private readonly activityService: ActivityService,
  ) {
    this.registerRepository = dataSource.getRepository(Register);
  }

  async register(
    registerDto: RegisterDto,
    activitySlug: string,
  ): Promise<Result> {
    const { phone } = registerDto;
    const activity = await this.activityService.getActivityBySlug(activitySlug);
    if (new Date() > activity?.end_date || !activity) {
      throw new BadRequestException({
        status: STATUS.ERROR,
        message: '活動時間已過',
      });
    }
    if (!this.dataSource.isInitialized) await this.dataSource.initialize();
    const registered = await this.registerRepository.findOneBy({ phone });
    if (registered)
      throw new BadRequestException({
        status: STATUS.ERROR,
        message: '您已經預約過囉',
      });
    const region = registerDto.phone.substring(0, 3);
    const completed = await this.registerRepository.save({
      phone: registerDto.phone,
      region,
    });
    if (!completed || completed.phone === undefined)
      throw new BadRequestException({
        status: STATUS.ERROR,
        message: '預約失敗，請稍後再試',
      });
    return {
      status: STATUS.SUCCESS,
      message: '您已完成預約囉',
    };
  }

  async getAllPlayers(): Promise<Register[]> {
    if (!this.dataSource.isInitialized) await this.dataSource.initialize();
    const data = await this.registerRepository.find();
    if (!data || data.length === 0)
      throw new NotFoundException({
        status: STATUS.ERROR,
        message: 'No players found',
      });
    return data;
  }

  async getAllPlayersCount(): Promise<number> {
    if (!this.dataSource.isInitialized) await this.dataSource.initialize();
    const data = await this.registerRepository.count();
    return data;
  }

  async getPlayersByRegion() {
    if (!this.dataSource.isInitialized) await this.dataSource.initialize();
    const data = await this.registerRepository
      .createQueryBuilder('register')
      .select('register.region', 'region')
      .addSelect('COUNT(register.id)', 'count')
      .groupBy('register.region')
      .orderBy('register.region', 'ASC')
      .getRawMany();
    return data;
  }

  async getPlayersByDateBetweenAndRegion(
    start: Date | string,
    end: Date | string,
    region: '886' | '852' | '853',
    sort: 'ASC' | 'DESC' = 'ASC',
  ) {
    if (!this.dataSource.isInitialized) await this.dataSource.initialize();
    const data = await this.registerRepository
      .createQueryBuilder('register')
      .select("TO_CHAR(register.created_at, 'YYYY-MM-DD')", 'date')
      .addSelect('COUNT(register.id)', 'count')
      .where('register.region = :region', { region })
      .andWhere('register.created_at BETWEEN :start AND :end', {
        start,
        end,
      })
      .groupBy('date')
      .orderBy('date', sort)
      .getRawMany();
    return data;
  }
}

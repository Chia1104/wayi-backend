import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { STATUS } from '@wanin/shared/types/status';
import { Result } from '@wanin/shared/interfaces/result.interface';
import { DATASOURCE } from '@wanin/modules/tenancy/tenancy.symbols';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterCount } from '@wanin/shared/entities';

@Injectable()
export class RegisterCountService {
  constructor(
    @Inject(DATASOURCE)
    private readonly dataSource: DataSource,
    @InjectRepository(RegisterCount)
    private readonly registerCountRepository: Repository<RegisterCount>,
  ) {
    this.registerCountRepository = dataSource.getRepository(RegisterCount);
  }

  async getRegisterCount(id: number): Promise<number | null> {
    if (!this.dataSource.isInitialized) await this.dataSource.initialize();
    const data = await this.registerCountRepository.findOneBy({ id });
    const { count } = data;
    return count ? count : null;
  }

  async updateRegisterCount(id: number, count: number): Promise<Result> {
    if (!this.dataSource.isInitialized) await this.dataSource.initialize();
    const data = await this.registerCountRepository.findOneBy({ id });
    const { count: c } = data;
    if (count < c)
      throw new BadRequestException({
        status: STATUS.ERROR,
        message: `count must be greater than current count, current count: ${c}`,
      });
    const success = await this.registerCountRepository.update(id, {
      count,
    });
    if (success.affected === 0)
      throw new BadRequestException({
        status: STATUS.ERROR,
        message: 'register count not found',
      });
    return { status: STATUS.SUCCESS, message: 'register count updated' };
  }
}

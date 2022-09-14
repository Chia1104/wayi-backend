import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from '@wanin/shared/entities';
import { type Repository } from 'typeorm';

@Injectable()
export class ActivityRepository {
  constructor(
    @InjectRepository(Activity)
    public readonly repository: Repository<Activity>,
  ) {}

  async getById(id: number): Promise<Activity> {
    return await this.repository.findOneBy({ id });
  }

  async getByName(name: string): Promise<Activity> {
    return await this.repository.findOneBy({ name });
  }

  async getBySlug(slug: string): Promise<Activity> {
    return await this.repository.findOneBy({ slug });
  }
}

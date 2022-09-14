import { Injectable } from '@nestjs/common';
import { RegisterService } from '@wanin/modules/register/services';
import { RegisterCountService } from '@wanin/modules/register-count/services';
import {
  getWeekEnd,
  getWeekStart,
  getToday,
  getMonday,
  getTuesday,
  getWednesday,
  getThursday,
  getFriday,
  getShortDate,
} from '@wanin/utils/day.util';

@Injectable()
export class AggregateService {
  constructor(
    private readonly registerService: RegisterService,
    private readonly registerCountService: RegisterCountService,
  ) {}

  async getMaxCount(): Promise<number> {
    const real = await this.registerService.getAllPlayersCount();
    const fake = (await this.registerCountService.getRegisterCount(1)) || 0;
    return real + fake;
  }

  async getTotalCountGroupByRegion(): Promise<any> {
    const _data = [
      {
        region: '852',
        count: '0',
      },
      {
        region: '853',
        count: '0',
      },
      {
        region: '886',
        count: '0',
      },
    ];
    const data_source = await this.registerService.getPlayersByRegion();

    const data = _data.map((item) => {
      const _item = data_source.find((i) => i.region === item.region);
      if (!_item) return item;
      return {
        region: item.region,
        count: _item.count,
      };
    });

    if (!data) return null;
    return data;
  }

  async getCountGroupByRegionAndWeek(): Promise<any> {
    const now = getToday();
    const start = getShortDate(getWeekStart(now));
    const monday = getShortDate(getMonday(now));
    const tuesday = getShortDate(getTuesday(now));
    const wednesday = getShortDate(getWednesday(now));
    const thursday = getShortDate(getThursday(now));
    const friday = getShortDate(getFriday(now));
    const end = getShortDate(getWeekEnd(now));

    const _data = [
      {
        date: start as string,
        count: '0',
      },
      {
        date: monday as string,
        count: '0',
      },
      {
        date: tuesday as string,
        count: '0',
      },
      {
        date: wednesday as string,
        count: '0',
      },
      {
        date: thursday as string,
        count: '0',
      },
      {
        date: friday as string,
        count: '0',
      },
      {
        date: end as string,
        count: '0',
      },
    ];

    const _taiwan = await this.registerService.getPlayersByDateBetweenAndRegion(
      start,
      end,
      '886',
    );

    const taiwan = _data.map((item) => {
      const t = _taiwan.find((i) => i.date === item.date);
      return {
        ...item,
        count: t ? t.count : '0',
      };
    });

    const _hongkong =
      await this.registerService.getPlayersByDateBetweenAndRegion(
        start,
        end,
        '852',
      );

    const hongkong = _data.map((item) => {
      const h = _hongkong.find((i) => i.date === item.date);
      return {
        ...item,
        count: h ? h.count : '0',
      };
    });

    const _macau = await this.registerService.getPlayersByDateBetweenAndRegion(
      start,
      end,
      '853',
    );

    const macau = _data.map((item) => {
      const m = _macau.find((i) => i.date === item.date);
      return {
        ...item,
        count: m ? m.count : '0',
      };
    });

    return {
      taiwan,
      hongkong,
      macau,
    };
  }
}

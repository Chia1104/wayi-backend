import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import {
  taiwanPhoneSchema,
  macaoPhoneSchema,
  hongKongPhoneSchema,
} from '@wanin/shared/types/phone';
import { z } from 'zod';
import { STATUS } from '@wanin/shared/types/status';

@Injectable()
export class CheckPhonePipe implements PipeTransform {
  transform(value: any) {
    const phone_transform = z.string().transform((val) => {
      val.split(val.substring(0, 3))[1];
    });
    const { phone: p } = value;
    const check = phone_transform.safeParse(p).success;
    if (!check)
      throw new BadRequestException({
        status: STATUS.ERROR,
        message: '您尚未輸入正確電話號碼',
      });
    const region: string = p.substring(0, 3);
    const phone: string = p.split(region)[1];
    let valid: boolean;
    switch (region) {
      case '886':
        valid = taiwanPhoneSchema.safeParse(phone).success;
        break;
      case '852':
        valid = hongKongPhoneSchema.safeParse(phone).success;
        break;
      case '853':
        valid = macaoPhoneSchema.safeParse(phone).success;
        break;
      default:
        valid = false;
        break;
    }
    if (!valid)
      throw new BadRequestException({
        status: STATUS.ERROR,
        message: '您尚未輸入正確電話號碼',
      });
    return value;
  }
}

import { Status } from '@wanin/shared/types/status';

export interface Result<T = any> {
  status: Status;

  message: string;

  data?: T;
}

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import {
  catchError,
  Observable,
  throwError,
  timeout,
  TimeoutError,
} from 'rxjs';
import { STATUS } from '@wanin/shared/types/status';
import { TIMEOUT_EXCEPTION_TIME } from '@wanin/shared/constants';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(TIMEOUT_EXCEPTION_TIME),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(
            () =>
              new RequestTimeoutException({
                status: STATUS.ERROR,
                message: '伺服器忙碌中，請稍後再試',
              }),
          );
        }
        return throwError(err);
      }),
    );
  }
}

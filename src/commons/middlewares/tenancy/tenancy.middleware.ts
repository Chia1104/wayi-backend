import { Request, Response } from 'express';
import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';

const ACTIVITY_HEADER = 'x-activity-slug';

@Injectable()
export class TenancyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const header = req.headers[ACTIVITY_HEADER] as string;
    req.activitySlug = header?.toString() || null;
    if (!req.activitySlug)
      throw new BadRequestException('Missing activity slug in request header');
    next();
  }
}

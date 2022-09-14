import {
  Controller,
  Post,
  Get,
  Body,
  UseInterceptors,
  NotFoundException,
  BadRequestException,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { RegisterService } from '../services';
import { RegisterDto } from '@wanin/shared/dto/register';
import { TimeoutInterceptor } from '@wanin/commons/interceptors';
import { CheckPhonePipe } from '@wanin/commons/pipes';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Result } from '@wanin/shared/interfaces/result.interface';
import { Register } from '@wanin/shared/entities';
import { STATUS } from '@wanin/shared/types/status';
import {
  ThrottlerBehindProxyGuard,
  FirebaseAuthGuard,
} from '@wanin/commons/guards';

@Controller('api/register')
@ApiTags('Register')
@UseInterceptors(TimeoutInterceptor)
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}
  @Post()
  @ApiOperation({ summary: 'Player register' })
  @ApiResponse({ status: 200, description: '您已完成預約囉' })
  @ApiResponse({
    status: 400,
    description:
      '您尚未輸入正確電話號碼 | 您已經預約過囉 | 預約失敗，請稍後再試',
  })
  @UseGuards(ThrottlerBehindProxyGuard)
  async register(
    @Headers('x-activity-slug') activitySlug: string,
    @Body(CheckPhonePipe) registerDto: RegisterDto,
  ): Promise<Result> {
    try {
      return await this.registerService.register(registerDto, activitySlug);
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException({
        status: STATUS.ERROR,
        message: '預約失敗，請稍後再試',
      });
    }
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Get all players' })
  @ApiResponse({ status: 200, description: 'Get all players' })
  @ApiResponse({ status: 404, description: 'No players found' })
  @ApiResponse({
    status: 400,
    description: 'Get all players failed',
  })
  async getAllPlayers(
    @Headers('x-activity-slug') activitySlug: string,
  ): Promise<Result<Register[]>> {
    try {
      const data = await this.registerService.getAllPlayers();
      return {
        status: STATUS.SUCCESS,
        message: 'Get all players',
        data,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException({
        status: STATUS.ERROR,
        message: 'Get all players failed',
      });
    }
  }
}

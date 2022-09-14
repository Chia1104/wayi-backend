import {
  Controller,
  Get,
  Header,
  Headers,
  Res,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { FileService } from '../services';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FirebaseAuthGuard } from '@wanin/commons/guards';
import { STATUS } from '@wanin/shared/types/status';

@Controller('api/file')
@ApiTags('File')
@ApiBearerAuth()
@UseGuards(FirebaseAuthGuard)
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('export-all-players')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  )
  @Header('Content-Disposition', 'attachment; filename=all-players.xlsx')
  async exportAllPlayers(
    @Headers('x-activity-slug') activitySlug: string,
    @Res() res,
  ) {
    try {
      const file = await this.fileService.exportAllPlayers();
      res.sendFile(file);
    } catch (error) {
      throw new BadRequestException({
        status: STATUS.ERROR,
        message: error.message,
      });
    }
  }
}

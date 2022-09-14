import { Injectable } from '@nestjs/common';
import { RegisterService } from '@wanin/modules/register/services';
import { FileRepository } from '../repositories';

@Injectable()
export class FileService {
  constructor(
    private readonly registerService: RegisterService,
    private readonly fileRepository: FileRepository,
  ) {}

  async exportAllPlayers() {
    const data = await this.registerService.getAllPlayers();
    const header = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Phone', key: 'phone', width: 20 },
      { header: 'Region', key: 'region', width: 10 },
      { header: 'Created At', key: 'created_at', width: 20 },
    ];
    return this.fileRepository.exportExcel(data || [], 'All Players', header);
  }
}

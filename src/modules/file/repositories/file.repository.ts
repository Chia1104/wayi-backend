import { Injectable, ImATeapotException } from '@nestjs/common';
import { Workbook } from 'exceljs';
import tmp from 'tmp';
import { STATUS } from '@wanin/shared/types/status';

@Injectable()
export class FileRepository {
  async exportExcel(data: any[], sheetName: string, header: any[]) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(sheetName);
    worksheet.columns = header;
    worksheet.addRows(data);
    return await new Promise((resolve) => {
      tmp.file(
        {
          discardDescriptor: true,
          prefix: sheetName,
          postfix: '.xlsx',
          mode: parseInt('0600', 8),
        },
        async (err, file) => {
          if (err)
            throw new ImATeapotException({
              status: STATUS.ERROR,
              message: 'Export excel error',
            });

          workbook.xlsx
            .writeFile(file)
            .then(() => {
              resolve(file);
            })
            .catch(() => {
              throw new ImATeapotException({
                status: STATUS.ERROR,
                message: 'Export excel error',
              });
            });
        },
      );
    });
  }
}

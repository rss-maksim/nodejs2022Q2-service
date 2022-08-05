import { Injectable, LoggerService } from '@nestjs/common';
import { join } from 'path';

import { writeFile } from '../../utils';

@Injectable()
export class LoggingService implements LoggerService {
  async log(message: string) {
    console.log(message);
    await writeFile(join(__dirname, '../../../logs/logs.txt'), `${message}\n`);
  }

  async error(message: string) {
    console.error(message);
    await writeFile(
      join(__dirname, '../../../logs/errors.txt'),
      `${message}\n`,
    );
  }

  async warn(message: string) {
    console.warn(message);
    await writeFile(join(__dirname, '../../../logs/logs.txt'), `${message}\n`);
  }

  debug?(message: any, ...optionalParams: any[]) {
    console.debug(message);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    console.log(message, optionalParams);
  }
}

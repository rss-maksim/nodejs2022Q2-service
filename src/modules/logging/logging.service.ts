import { Injectable, LoggerService } from '@nestjs/common';
import { join } from 'path';

import { writeFile } from '../../utils';

@Injectable()
export class LoggingService implements LoggerService {
  async log(message: string) {
    console.log(__dirname);
    console.log(message);
    await writeFile(join(__dirname, '../../../logs/logs.txt'), `${message}\n`);
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(message);
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(message);
  }

  debug?(message: any, ...optionalParams: any[]) {
    console.debug(message);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    console.log(message, optionalParams);
  }
}

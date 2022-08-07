import { Injectable, LoggerService, LogLevel } from '@nestjs/common';
import { join } from 'path';

import { writeFile } from '../../utils';
import { getEnvironment } from '../../env';

const logLevelsOrder: LogLevel[] = ['verbose', 'debug', 'log', 'warn', 'error'];

@Injectable()
export class LoggingService implements LoggerService {
  protected static logLevels?: LogLevel[] = [];

  constructor() {
    let logLevel: number = logLevelsOrder.indexOf(
      getEnvironment().LOGGING_LEVEL as LogLevel,
    );
    if (logLevel === -1) {
      logLevel = 2;
    }
    LoggingService.logLevels = logLevelsOrder.slice(logLevel);
  }

  static isLevelEnabled(level: LogLevel): boolean {
    return LoggingService.logLevels.includes(level);
  }

  async log(message: string) {
    if (LoggingService.isLevelEnabled('log')) {
      console.log(message);
      await writeFile(
        join(__dirname, '../../../logs/logs.txt'),
        `[LOG] ${message}\n`,
      );
    }
  }

  async error(message: string) {
    if (LoggingService.isLevelEnabled('error')) {
      console.error(message);
      await writeFile(
        join(__dirname, '../../../logs/errors.txt'),
        `[ERROR] ${message}\n`,
      );
    }
  }

  async warn(message: string) {
    if (LoggingService.isLevelEnabled('warn')) {
      console.warn(message);
      await writeFile(
        join(__dirname, '../../../logs/logs.txt'),
        `[WARN] ${message}\n`,
      );
    }
  }

  async debug?(message: string) {
    if (LoggingService.isLevelEnabled('debug')) {
      console.debug(message);
      await writeFile(
        join(__dirname, '../../../logs/logs.txt'),
        `[DEBUG] ${message}\n`,
      );
    }
  }

  async verbose?(message: string, ...optionalParams: any[]) {
    if (LoggingService.isLevelEnabled('verbose')) {
      console.log(message, optionalParams);
      await writeFile(
        join(__dirname, '../../../logs/logs.txt'),
        `[VERBOSE] ${message}\n`,
      );
    }
  }
}

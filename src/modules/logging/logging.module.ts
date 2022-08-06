import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { LoggingService } from './logging.service';
import { CustomExceptionsFilter } from './custom-exception.filter';

@Module({
  providers: [
    LoggingService,
    {
      provide: APP_FILTER,
      useClass: CustomExceptionsFilter,
    },
  ],
  exports: [LoggingService],
})
export class LoggingModule {}

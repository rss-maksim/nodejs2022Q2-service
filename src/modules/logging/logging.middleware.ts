import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { LoggingService } from './logging.service';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private readonly logger = new LoggingService();

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl, query, body } = request;
    const queryString = Object.entries(query)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    const queryStringPart = queryString ? `queryParams: "${queryString}"` : '';

    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      try {
        this.logger.log(
          `${method} ${originalUrl} ${queryStringPart}, body: ${JSON.stringify(
            body,
          )}, status: ${statusCode}, contentLength: ${contentLength}B`,
        );
      } catch (error) {
        console.log(error);
      }
    });

    next();
  }
}

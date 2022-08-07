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
      const time = new Date().toUTCString();

      // Log all the requests
      this.logger.log(
        `${time}: ${method} ${originalUrl} ${queryStringPart}, body: ${JSON.stringify(
          body,
        )}, status: ${statusCode}, contentLength: ${contentLength}B`,
      );

      // Log the requests with errors
      if (statusCode >= 400) {
        this.logger.error(
          `${time}: ${method} ${originalUrl} ${queryStringPart}, body: ${JSON.stringify(
            body,
          )}, status: ${statusCode}, contentLength: ${contentLength}B`,
        );

        this.logger.warn(
          `${time}: ${method} ${originalUrl} ${queryStringPart}, body: ${JSON.stringify(
            body,
          )}, status: ${statusCode}, contentLength: ${contentLength}B`,
        );
      }
    });

    next();
  }
}

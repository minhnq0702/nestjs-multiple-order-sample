import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { MyException } from '@src/entities/error.entity';

@Catch()
export default class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: Error, host: ArgumentsHost): void {
    console.debug('[AllExceptionFilter] exception', exception);
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let code: number = 1;
    let statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let error: string | object = 'INTERNAL_SERVER_ERROR';
    let additional: object | null = null;
    switch (true) {
      case exception instanceof MyException:
        code = exception.code;
        statusCode = exception.httpStatus;
        error = exception.error;
        additional = exception.additional;
        break;
      case exception instanceof HttpException:
        statusCode = exception.getStatus();
        error = exception.getResponse();
        if (typeof error === 'object' && error.hasOwnProperty('message')) {
          error = error['message'];
        }
        break;
      case exception instanceof Error:
        error = exception.message;
        break;
      default:
        break;
    }

    const responseBody = {
      code,
      error,
      timestamp: new Date().toISOString(),
      // path: httpAdapter.getRequestUrl(ctx.getRequest()),
      additional,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}

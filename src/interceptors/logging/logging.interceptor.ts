// src/courses/interceptors/logging.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest<Request>();
    const start = Date.now();

    console.log(`Interceptando: ${request.method} ${request.url}`);

    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(`Requisição finalizada em ${Date.now() - start}ms`),
        ),
      );
  }
}

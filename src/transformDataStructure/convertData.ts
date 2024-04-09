import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type DataType = {
  status: number,
  data: JSON
  }


@Injectable()
export class TransformDataStructure implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler):Observable<DataType> {
    const statusCode = context.switchToHttp().getResponse().statusCode || 200;

    return next.handle().pipe(
      map(data => ({ data, status: statusCode }))
    );
  }
}





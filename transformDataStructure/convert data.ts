import { Injectable, ExecutionContext } from '@nestjs/common';

type StatusType<T> = {
    statusCode: any,
    data: T
    }
    



@Injectable()
export class TransformDataStructureService {
    transformResponse(data: any,/* message: string = 'Success'*/ context: ExecutionContext): StatusType<any> {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode || 200; // Default status code to 200 if not set
        return {
            statusCode,
            data,
        };
    }
}
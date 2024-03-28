import { Injectable, NestMiddleware, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ValidateDataStructure implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const transformedResponse = res.locals.transformedResponse;
        
        // Check if the transformed response is in the appropriate format
        if (!transformedResponse || typeof transformedResponse !== 'object' || !transformedResponse.hasOwnProperty('status') || !transformedResponse.hasOwnProperty('data')) {
            throw new HttpException('Invalid response format', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
        next();
    }
}

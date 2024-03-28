import { Injectable, NestMiddleware, ExecutionContext } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TransformDataStructure implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {

        const data = req.body;
        const status = req.statusCode || 200;
        // Transform the response
        const transformedResponse = {
            status: status,
            data: data,
        };
        res.status(200).json(transformedResponse);
        next();
    }
}




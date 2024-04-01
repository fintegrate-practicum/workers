import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { TransformDataStructure } from '../transformDataStructure/convertData';
import { Request, Response } from 'express';

@Controller('workers')
export class WorkersController {

    @Get()
    @UseInterceptors(TransformDataStructure)
    async getData(req: Request, res: Response): Promise<any> {
        return { message: 'Original data' };
    }
}


import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { TransformDataStructure } from '../transformDataStructure/convertData';
import { Request, Response } from 'express';
@ApiBearerAuth()
@ApiTags('workers')
@Controller('workers')
export class WorkersController {

    @Get()
    @ApiBearerAuth()
    @ApiTags('workers')
    @UseInterceptors(TransformDataStructure)
    async getData(req: Request, res: Response): Promise<void> {
        res.json({ message: 'Original data' });
    }
}

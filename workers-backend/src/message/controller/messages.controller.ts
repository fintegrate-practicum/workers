
import { Body, Controller, Get, Param, Put, HttpException, HttpStatus } from '@nestjs/common';
import { Message } from 'src/schemas/message.entity';
import { MessagesService } from '../service/messages.service';
import { ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

@ApiTags('message')
@Controller('message')
export class MessagesController {
    constructor(private readonly _messageService: MessagesService) {}

    @Get('/:id')
    async getMessagesByEmployeeId(@Param('id') id: string) {
        try {
            const messages = await this._messageService.getMessagesByEmployeeId(id);
            return messages;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Failed to get messages by employee ID',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

import { Body, Controller, Get, Param, Put, HttpException, HttpStatus, Post } from '@nestjs/common';
import { Message } from '../../schemas/message.entity';
import { MessagesService } from '../service/messages.service'
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

@ApiTags('message')
@Controller('message')
export class MessagesController {

    constructor(private readonly _messageService: MessagesService) { }

    @Get('/:id')
    async getMessagesByEmployeeId(@Param('id') id: string) {
        try {
            const messages = await this._messageService.getMessagesByEmployeeId(id);
            return messages;
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Failed to get messages by employee ID',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
    @Post('/')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                message_id: { type: 'number' },
                business_id: { type: 'string' },
                sender_id: { type: 'string', format: 'uuid' },
                receiver_id: { type: 'string', format: 'uuid' },
                message_content: { type: 'string' },
                date_time: { type: 'string', format: 'date-time' },
                read_status: { type: 'boolean' },
                status: { type: 'string' }
            }
        }
    })
    async postMessage(@Body() message: Message) {
        try {
            const addMessage = await this._messageService.addMessage(message);
            return addMessage;
        } catch (err) {
            throw new Error(`Error adding message: ${err.message}`);
        }
    }

    @Put('/:id')
    async updateMessageIsRead(@Param('id') id: string) {
        const updatedMessage = await this._messageService.updateMessageIsRead(id);
        return updatedMessage;
    }
}


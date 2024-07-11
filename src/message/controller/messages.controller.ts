import { Body, Controller, Get, Param, Put, HttpException, HttpStatus, Post } from '@nestjs/common';
import { Message } from '../../schemas/message.entity';
import { MessagesService } from '../service/messages.service'
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('message')
@Controller('message')
export class MessagesController {

    constructor(private readonly _messageService: MessagesService) { }

    @Get('/:id')
    async getMessagesByEmployeeId(@Param('id') id: string) {
        if (!id)
            throw new HttpException('ID is required', HttpStatus.BAD_REQUEST);
        try {
            const messages = await this._messageService.getMessagesByEmployeeId(id);
            if (!messages || messages.length === 0)
                throw new HttpException('Messages not found', HttpStatus.NOT_FOUND);
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
        if (!message)
            throw new HttpException('Message body is required', HttpStatus.BAD_REQUEST);
        try {
            const addMessage = await this._messageService.addMessage(message);
            return addMessage;
        } catch (err) {
            throw new Error(`Error adding message: ${err.message}`);
        }
    }

    @Put('/:id')
    async updateMessageIsRead(@Param('id') id: string) {
        if (!id)
            throw new HttpException('ID is required', HttpStatus.BAD_REQUEST);
        try{
        const updatedMessage = await this._messageService.updateMessageIsRead(id);
        if (!updatedMessage)
            throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
        return updatedMessage;
    }catch(error){
        throw new HttpException(
            {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: `Error updating message: ${error.message}`,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
    }
}



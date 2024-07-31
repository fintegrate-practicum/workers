import { Body, Controller, Get, Param, Put, Post, NotFoundException } from '@nestjs/common';
import { Message } from '../../schemas/message.entity';
import { MessagesService } from '../service/messages.service'
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('message')

// import { AuditLogInterceptor } from '

../../../infrastructure/auditLog-middleware/audit-log.interceptor'; @UseInterceptors(AuditLogInterceptor) @Controller


('message')
export class MessagesController {

    constructor(private readonly _messageService: MessagesService) { }

    @Get('/:id')
    async getMessagesByEmployeeId(@Param('id') id: string) {
        const messages = await this._messageService.getMessagesByEmployeeId(id);
        if (!messages || messages.length === 0)
            return [];
        return messages;
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
        const addMessage = await this._messageService.addMessage(message);
        return addMessage;
    }

    @Put('/:id')
    async updateMessageIsRead(@Param('id') id: string) {
        const updatedMessage = await this._messageService.updateMessageIsRead(id);
        if (!updatedMessage)
            throw new NotFoundException('Message not found');
        return updatedMessage;
    }
}



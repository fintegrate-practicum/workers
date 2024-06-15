import { Body, Controller, Post } from '@nestjs/common';
import { Message } from 'src/schemas/message.entity';
import { MessagesService } from '../services/messages.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { Types } from 'mongoose';

@ApiTags('message')
@Controller('message')
export class MessagesController {
    constructor(private readonly messageService: MessagesService) { }

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
            const addMessage = await this.messageService.addMessage(message);
            return addMessage;
        } catch (err) {
            throw new Error(`Error adding message: ${err.message}`);
        }
    }
}
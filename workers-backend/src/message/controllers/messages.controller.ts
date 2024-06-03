import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { Message } from 'src/schemas/message.entity';
import { MessagesService } from '../services/messages.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('message')
@Controller('message')
export class MessagesController {
    constructor(private readonly messageService: MessagesService) { }

    @Put('/')
    async updateMessage(@Body() message: Message) {
        const updatedMessage = await this.messageService.updateMessage(message);
        return updatedMessage;
    }
    
    @Get('/')
    async getAllMessage(){
        return await this.messageService.getMessages();
    }
    
    @Post('/')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                userId: { type: 'string' },
                businessId: { type: 'number' },
                code: { type: 'string' },
                createdBy: { type: 'string' },
                updatedBy: { type: 'string' },
                roleId: { type: 'string' },
                active: { type: 'boolean' },
                signupTime: { type: 'string', format: 'date-time' },
                position: { type: 'string' }
            }
        }
    })
    async postMessage(@Body() message: Message) {
        const addMessage = await this.messageService.addMessage(message);
        return addMessage;
    }

}

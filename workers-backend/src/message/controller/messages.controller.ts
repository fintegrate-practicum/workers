import { Body, Controller, Put } from '@nestjs/common';
import { Message } from 'src/schemas/message.entity';
import { MessagesService } from '../service/messages.service';

@Controller('message')
export class MessagesController {
    constructor(private readonly messageService: MessagesService) { }

    @Put('/')
    async updateMessage(@Body() message: Message) {
        const updatedMessage = await this.messageService.updateMessage(message);
        return updatedMessage;
    }
}


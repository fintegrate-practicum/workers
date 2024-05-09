import { Body, Controller, Param, Put } from '@nestjs/common';
import { Message } from 'src/schemas/message.entity';
import { MessagesService } from '../service/messages.service';

@Controller('message')
export class MessagesController {
    constructor(private readonly _messageService: MessagesService) { }

    @Put('/')
    async createMessage(@Param('managerId') managerId: string, @Body() message: Message) {
        const res = await this._messageService.createMessage(message);
        return res;
    }
}

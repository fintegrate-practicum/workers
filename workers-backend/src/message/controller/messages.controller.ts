import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { Message } from 'src/schemas/message.entity';
import { MessagesService } from '../service/messages.service';
import { ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
@ApiTags('message')
@Controller('message')
export class MessagesController {
    constructor(private readonly _messageService: MessagesService) { }

    // @Put('/manager/:managerId/new-message')
    // async createMessage(@Param('managerId') managerId: string, @Body() message: Message) {
    //     const res = await this._messageService.createMessage(message);
    //     return res;
    // }
  
    @Get('/:id')
    async getMessagesByEmployeeId(@Param('id') id: string) {
        const messages = await this._messageService.getMessagesByEmployeeId(id);
        return messages;
    }
}

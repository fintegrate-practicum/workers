import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { Message } from 'src/schemas/message.entity';
import { MessagesService } from '../service/messages.service';
import { ApiBody, ApiTags } from '@nestjs/swagger'; // Import Swagger decorators

@ApiTags('message')
@Controller('message')
export class MessagesController {

    constructor(private readonly messageService: MessagesService) { }

    @Put('/:id')
    async updateMessage1(@Param('id') id: string) {
        const updatedMessage = await this.messageService.updateMessage(id);
        return updatedMessage;
    }
}


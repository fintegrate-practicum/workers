import { Controller, Param, Put } from '@nestjs/common';
import { MessagesService } from '../service/messages.service';
import { ApiTags } from '@nestjs/swagger';

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


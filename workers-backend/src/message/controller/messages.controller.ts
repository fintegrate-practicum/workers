import { Controller, Param, Put } from '@nestjs/common';
import { MessagesService } from '../service/messages.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('message')
@Controller('message')
export class MessagesController {

    constructor(private readonly messageService: MessagesService) { }

    @Put('/:id')
    async updateMessageIsRead(@Param('id') id: string) {
        const updatedMessage = await this.messageService.updateMessageIsRead(id);
        return updatedMessage;
    }
}


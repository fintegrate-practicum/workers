import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Post,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { Message } from '../../schemas/message.entity';
import { MessagesService } from '../service/messages.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Role, Roles, RolesGuard } from 'fintegrate-auth';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('message')
@Controller('message')
export class MessagesController {
  constructor(private readonly _messageService: MessagesService) {}

  @Get('/:id')
  @Roles(Role.Admin, Role.Worker)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getMessagesByEmployeeId(@Param('id') id: string) {
    const messages = await this._messageService.getMessagesByEmployeeId(id);
    if (!messages || messages.length === 0) return [];
    return messages;
  }

  @Post('/')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
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
        status: { type: 'string' },
      },
    },
  })
  async postMessage(@Body() message: Message) {
    const addMessage = await this._messageService.addMessage(message);
    return addMessage;
  }

  @Put('/:id')
  @Roles(Role.Worker)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async updateMessageIsRead(@Param('id') id: string) {
    const updatedMessage = await this._messageService.updateMessageIsRead(id);
    if (!updatedMessage) throw new NotFoundException('Message not found');
    return updatedMessage;
  }
}

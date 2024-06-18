import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '../../schemas/message.entity';

@Injectable()
export class MessagesService {
  private readonly logger = new Logger(MessagesService.name);

  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {}

  async addMessage(message: Message): Promise<Message> {
    try {
      if (message) {
        const newMessage = new this.messageModel(message);
        return await newMessage.save();
      }
      return null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from 'src/schemas/message.entity';

@Injectable()
export class MessagesService {
    constructor(
        @InjectModel(Message.name) private readonly messageModel: Model<Message>,
    ) { }

    async createMessage(message: Message): Promise<Message> {
        const newMessage = new this.messageModel(message);
        return await newMessage.save();
    }
}

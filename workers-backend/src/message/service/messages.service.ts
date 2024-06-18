import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '../../schemas/message.entity';

@Injectable()
export class MessagesService {
    constructor(
        @InjectModel(Message.name) private readonly messageModel: Model<Message>,
    ) { }

    async updateMessageIsRead(id: string): Promise<Message> {
        let updatedMessageIsRead = await this.messageModel.findByIdAndUpdate(id, { read_status: true });
        updatedMessageIsRead = await this.messageModel.findById(id)
        if (!updatedMessageIsRead) {
            throw new Error('Message not found');
        }
        return updatedMessageIsRead;
    }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from 'src/schemas/message.entity';

@Injectable()
export class MessagesService {
    constructor(
        @InjectModel(Message.name) private readonly messageModel: Model<Message>,
    ) { }

    async updateMessage(message: Message): Promise<Message> {
        return await this.messageModel.findByIdAndUpdate(message.id, message, { new: true }).exec()
    }
}

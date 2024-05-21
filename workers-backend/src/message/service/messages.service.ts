import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
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
    async getMessagesByEmployeeId(id: string): Promise<Message[]> {
        const objectId = new mongoose.Types.ObjectId(id)  
        return await this.messageModel.find({ receiver_id: objectId  }).sort({ date_time: -1 }).exec();
    }    
}

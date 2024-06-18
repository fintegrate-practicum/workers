import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import { Message } from '../../schemas/message.entity';

@Injectable()
export class MessagesService {
    constructor(
        @InjectModel(Message.name) private readonly messageModel: Model<Message>,
    ) { }

    async createMessage(message: Message): Promise<Message> {
        try {
            const newMessage = new this.messageModel(message);
            return await newMessage.save();
        } catch (error) {
            throw new InternalServerErrorException('Failed to create message');
        }
    }

    async getMessagesByEmployeeId(id: string): Promise<Message[]> {
        try {
            const objectId = new mongoose.Types.ObjectId(id);
            return await this.messageModel.find({ receiver_id: objectId }).sort({ date_time: -1 }).exec();
        } catch (error) {
            throw new InternalServerErrorException('Failed to get messages by employee ID');
        }
    }
}

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import { Message } from '../../schemas/message.entity';

@Injectable()
export class MessagesService {
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

  async getMessagesByEmployeeId(id: string): Promise<Message[]> {
    try {
      const objectId = new mongoose.Types.ObjectId(id);
      return await this.messageModel
        .find({ receiver_id: objectId })
        .sort({ date_time: -1 })
        .exec();
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to get messages by employee ID',
      );
    }
  }
}

import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Message } from '../../schemas/message.entity';

@Injectable()
export class MessagesService {
    constructor(
        @InjectModel(Message.name) private readonly messageModel: Model<Message>,
    ) { }

    async addMessage(message: Message): Promise<Message> {
        if (!message)
            throw new BadRequestException('Message content is required')
        const newMessage = new this.messageModel(message);
        return await newMessage.save();
    }

    async getMessagesByEmployeeId(id: string): Promise<Message[]> {
        if (!id)
            throw new BadRequestException('employee id is required');
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

    async updateMessageIsRead(id: string): Promise<Message> {
        if (!id)
            throw new BadRequestException('ID is required');
        const messageToUpdate = await this.messageModel.findByIdAndUpdate(id, { read_status: true });
        if (!messageToUpdate)
            throw new NotFoundException('Message not found');
        const updatedMessage = await this.messageModel.findById(id)
        return updatedMessage;
    }
}
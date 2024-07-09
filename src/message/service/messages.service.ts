import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Message } from '../../schemas/message.entity';

@Injectable()
export class MessagesService {
    constructor(
        @InjectModel(Message.name) private readonly messageModel: Model<Message>,
    ) { }

    async addMessage(message: Message): Promise<Message> {
        try {
            if (!message)
                throw new BadRequestException('Message content is required')
            const newMessage = new this.messageModel(message);
            return await newMessage.save();
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Error adding message');
        }
    }

    async getMessagesByEmployeeId(id: string): Promise<Message[]> {
        if (!id)
            throw new BadRequestException('Employee ID is required');
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
            throw new BadRequestException('Message ID is required');
        try{
        let updatedMessageIsRead = await this.messageModel.findByIdAndUpdate(id, { read_status: true });
        if (!updatedMessageIsRead) 
            throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
        updatedMessageIsRead = await this.messageModel.findById(id)
        return updatedMessageIsRead;
    }catch(error){
        if (error.status === HttpStatus.NOT_FOUND)
            throw error;
        throw new InternalServerErrorException('Error updating message status');
    }
    }
}
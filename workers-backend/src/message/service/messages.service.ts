import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from 'src/schemas/message.entity';
@Injectable()
export class MessagesService {
    constructor(
        @InjectModel(Message.name) private readonly messageModel: Model<Message>,
    ) { }

    async updateMessage(id: string): Promise<Message> {
        // קודם הוא מחזיר את מה שמצא ורק אח"כ מעדכן אותו
        let updatedMessageIsRead = await this.messageModel.findOneAndUpdate({ message_id: id }, { read_status: true });
        // לכן עכשיו לאחר העדכון נשמור את האובייקט שעודכן
        updatedMessageIsRead = await this.messageModel.findOne({ message_id: id });
        if (!updatedMessageIsRead) {
            throw new Error('Message not found');
        }
        return updatedMessageIsRead;
    }
}
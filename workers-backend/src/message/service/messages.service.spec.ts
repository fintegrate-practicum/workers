import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { MessagesService } from './messages.service';
import { Message } from '../../schemas/message.entity';
import { Model } from 'mongoose';

describe('MessagesService', () => {
    let service: MessagesService;
    let model: Model<Message>;

    const mockMessage = { _id: '1', message_id: '1', read_status: true };

    const messageModel = {
        findOneAndUpdate: jest.fn().mockResolvedValue(mockMessage),
        findOne: jest.fn().mockResolvedValue(mockMessage),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessagesService,
                { provide: getModelToken(Message.name), useValue: messageModel },
            ],
        }).compile();

        service = module.get<MessagesService>(MessagesService);
        model = module.get<Model<Message>>(getModelToken(Message.name));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should update message read status and return the updated message', async () => {
        const id = '1';

        await service.updateMessageIsRead(id);
        expect(model.findOneAndUpdate).toHaveBeenCalledWith(
            { message_id: id },
            { read_status: true }
        );
        expect(model.findOne).toHaveBeenCalledWith({ message_id: id });
    });

    it('should throw an error if message is not found', async () => {
        jest.spyOn(model, 'findOne').mockResolvedValueOnce(null);

        await expect(service.updateMessageIsRead('2')).rejects.toThrow('Message not found');
    });
});
import { Test, TestingModule } from '@nestjs/testing';
import { MessagesService } from './messages.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '../../schemas/message.entity';

describe('MessagesService', () => {
  let service: MessagesService;
  let model: Model<Message>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        {
          provide: getModelToken(Message.name),
          useValue: {
            findByIdAndUpdate: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
    model = module.get<Model<Message>>(getModelToken(Message.name));
  });

  it('should update message as read', async () => {
    const messageId = 'testId';
    const mockMessage = { _id: messageId, read_status: true };

    model.findByIdAndUpdate = jest.fn().mockResolvedValue(mockMessage);
    model.findById = jest.fn().mockResolvedValue(null);

    const updatedMessage = await service.updateMessageIsRead(messageId);

    expect(model.findByIdAndUpdate).toHaveBeenCalledWith(messageId, { read_status: true });
    expect(model.findById).toHaveBeenCalledWith(messageId);
    expect(updatedMessage).toEqual(mockMessage);
  });

  it('should throw an error if message is not found', async () => {
    const messageId = 'invalidId';
    model.findById = jest.fn().mockResolvedValue(null);
    await expect(service.updateMessageIsRead(messageId)).rejects.toThrow('Message not found');
  });
});
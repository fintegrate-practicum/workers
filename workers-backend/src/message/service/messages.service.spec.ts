import { Test, TestingModule } from '@nestjs/testing';
import { MessagesService } from './messages.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '../../schemas/message.entity';

describe('MessagesService', () => {
  let service: MessagesService;
  let mockMessageModel: Model<Message>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        {
          provide: getModelToken(Message.name),
          useValue: {
            findByIdAndUpdate: jest.fn().mockResolvedValue({ _id: 'testId', read_status: true }),
            findById: jest.fn().mockResolvedValue({ _id: 'testId', read_status: true }),
          },
        },
      ],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
    mockMessageModel = module.get<Model<Message>>(getModelToken(Message.name));
  });

  it('should update message as read', async () => {
    const messageId = 'testId';
    const updatedMessage = { _id: 'testId', read_status: true };
    const result = await service.updateMessageIsRead(messageId);

    expect(mockMessageModel.findByIdAndUpdate).toBeCalledWith(messageId, { read_status: true });
    expect(mockMessageModel.findById).toBeCalledWith(messageId);
    expect(result).toEqual(updatedMessage);
  });
});
import { MessagesService } from './messages.service';
import { Message, MessageSchema } from '../../schemas/message.entity';
import { Model, Types } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

describe('MessagesService', () => {
  let messagesService: MessagesService;
  let model: Model<Message>;

  const mockMessage: Message[] = [
    new Message({
      _id: new Types.ObjectId(),
      message_id: 3,
      business_id: '12#@%2',
      sender_id: new Types.ObjectId(),
      receiver_id: new Types.ObjectId(),
      message_content: 'Test message 3',
      date_time: new Date(),
      read_status: false,
      status: 'new',
    }),
    new Message({
      _id: new Types.ObjectId(),
      message_id: 4,
      business_id: '12#@%2',
      sender_id: new Types.ObjectId(),
      receiver_id: new Types.ObjectId(),
      message_content: 'Test message 4',
      date_time: new Date(),
      read_status: true,
      status: 'new',
    }),
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        {
          provide: getModelToken('Message'),
          useValue: {
            create: jest.fn(),
            countDocuments: jest.fn(),
          },
        },
      ],
    }).compile();

    messagesService = module.get<MessagesService>(MessagesService);
    model = module.get<Model<Message>>(getModelToken('Message'));
  });

  describe('addMessage', () => {
    it('should create and return a message', async () => {
      jest
        .spyOn(model, 'create')
        .mockResolvedValueOnce([mockMessage[0]] as any);
      const newMessage = new Message({
        message_id: 3,
        business_id: '12#@%2',
        sender_id: new Types.ObjectId(),
        receiver_id: new Types.ObjectId(),
        message_content: 'Test message 3',
        date_time: new Date(),
        read_status: false,
        status: 'new',
      });
      const result = await messagesService.addMessage(newMessage);
      expect(result).toEqual(mockMessage[0]);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { MessagesService } from './messages.service';
import { Message } from '../../schemas/message.entity';
import { Model, Types } from 'mongoose';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';

describe('MessagesService', () => {
  let service: MessagesService;
  let model: Model<Message>;

  const mockMessage = {
    _id: new Types.ObjectId(),
    business_id: '12#@%2',
    sender_id: new Types.ObjectId(),
    receiver_id: new Types.ObjectId(),
    message_content: 'Test message 3',
    date_time: new Date(),
    read_status: false,
    status: 'new',
  };

  const mockMessageModel = {
    new: jest.fn().mockImplementation((message) => ({
      ...message,
      save: jest.fn().mockResolvedValue(mockMessage),
    })),
    findByIdAndUpdate: jest.fn().mockResolvedValue(mockMessage),
    findById: jest.fn().mockResolvedValue(mockMessage),
    create: jest.fn().mockResolvedValue(mockMessage),
    find: jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue([mockMessage]),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        {
          provide: getModelToken(Message.name),
          useValue: mockMessageModel,
        },
      ],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
    model = module.get<Model<Message>>(getModelToken(Message.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getMessagesByEmployeeId', () => {
    it('should throw BadRequestException if id is not provided', async () => {
      await expect(service.getMessagesByEmployeeId('')).rejects.toThrow(BadRequestException);
    });

    it('should return an array of messages', async () => {
      const result = await service.getMessagesByEmployeeId(mockMessage.receiver_id.toHexString());
      expect(result).toEqual([mockMessage]);
      expect(mockMessageModel.find).toHaveBeenCalledWith({ receiver_id: mockMessage.receiver_id });
      expect(mockMessageModel.find().sort).toHaveBeenCalledWith({ date_time: -1 });
      expect(mockMessageModel.find().exec).toHaveBeenCalled();
    });

    it('should throw InternalServerErrorException on error', async () => {
      jest.spyOn(model, 'find').mockImplementationOnce(() => {
        throw new Error('some error');
      });
      await expect(service.getMessagesByEmployeeId(mockMessage.receiver_id.toHexString())).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('addMessage', () => {
    it('should throw BadRequestException if message is not provided', async () => {
      await expect(service.addMessage(null)).rejects.toThrow(BadRequestException);
    });

    it('should create and return a message', async () => {
      const newMessage = {
        business_id: '12#@%2',
        sender_id: new Types.ObjectId(),
        receiver_id: new Types.ObjectId(),
        message_content: 'Test message 3',
        date_time: new Date(),
        read_status: false,
        status: 'new',
      };

      const result = await service.addMessage(newMessage as any);
      expect(result).toEqual(mockMessage);
      expect(mockMessageModel.create).toHaveBeenCalledWith(newMessage);
    });
  });

  describe('updateMessageIsRead', () => {
    it('should throw BadRequestException if id is not provided', async () => {
      await expect(service.updateMessageIsRead('')).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if message is not found', async () => {
      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValueOnce(null);
      await expect(service.updateMessageIsRead(mockMessage._id.toHexString())).rejects.toThrow(NotFoundException);
    });

    it('should update and return the message', async () => {
      const result = await service.updateMessageIsRead(mockMessage._id.toHexString());
      expect(result).toEqual(mockMessage);
      expect(mockMessageModel.findByIdAndUpdate).toHaveBeenCalledWith(mockMessage._id.toHexString(), { read_status: true });
      expect(mockMessageModel.findById).toHaveBeenCalledWith(mockMessage._id.toHexString());
    });
  });
});


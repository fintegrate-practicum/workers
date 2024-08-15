import { Test, TestingModule } from '@nestjs/testing';
import { MessagesController } from './messages.controller';
import { MessagesService } from '../service/messages.service';
import { HttpModule } from '@nestjs/axios';
import { Message } from '../../schemas/message.entity';
import { BadRequestException, HttpException } from '@nestjs/common';
import { Types } from 'mongoose';

describe('MessagesController', () => {
  let controller: MessagesController;
  let service: MessagesService;

  const mockMessage: Message = {
    _id: new Types.ObjectId(),
    business_id: '12#@%2',
    sender_id: new Types.ObjectId(),
    receiver_id: new Types.ObjectId(),
    message_content: 'Test message',
    date_time: new Date(),
    read_status: false,
    status: 'new',
  } as Message;

  const mockMessageService = {
    getMessagesByEmployeeId: jest.fn().mockResolvedValue([mockMessage]),
    addMessage: jest.fn().mockResolvedValue(mockMessage),
    updateMessageIsRead: jest.fn().mockResolvedValue(mockMessage),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [MessagesController],
      providers: [
        {
          provide: MessagesService,
          useValue: mockMessageService,
        },
      ],
    }).compile();

    controller = module.get<MessagesController>(MessagesController);
    service = module.get<MessagesService>(MessagesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getMessagesByEmployeeId', () => {
    it('should return an array of messages', async () => {
      const result = await controller.getMessagesByEmployeeId(
        mockMessage.receiver_id.toHexString(),
      );
      expect(result).toEqual([mockMessage]);
      expect(service.getMessagesByEmployeeId).toHaveBeenCalledWith(
        mockMessage.receiver_id.toHexString(),
      );
    });

    it('should return an empty array if no messages are found', async () => {
      jest.spyOn(service, 'getMessagesByEmployeeId').mockResolvedValueOnce([]);
      const result = await controller.getMessagesByEmployeeId(
        mockMessage.receiver_id.toHexString(),
      );
      expect(result).toEqual([]);
    });
  });

  it('should throw HttpException if service throws error', async () => {
    const employeeId = '60d9c6f3f9b5b61710f0f4f4';
    mockMessageService.getMessagesByEmployeeId.mockRejectedValueOnce(
      new BadRequestException('Invalid data'),
    );

    await expect(
      controller.getMessagesByEmployeeId(employeeId),
    ).rejects.toThrow(HttpException);
  });

  describe('postMessage', () => {
    it('should call addMessage and return the result', async () => {
      const result = await controller.postMessage(mockMessage);
      expect(result).toEqual(mockMessage);
      expect(service.addMessage).toHaveBeenCalledWith(mockMessage);
    });

    it('should throw HttpException if service throws error', async () => {
      mockMessageService.addMessage.mockRejectedValueOnce(
        new BadRequestException('Invalid data'),
      );

      await expect(controller.postMessage(mockMessage)).rejects.toThrow(
        HttpException,
      );
    });
  });

  describe('updateMessageIsRead', () => {
    it('should call updateMessageIsRead and return the result', async () => {
      const id = String(mockMessage._id);
      const result = await controller.updateMessageIsRead(id);
      expect(result).toEqual(mockMessage);
      expect(service.updateMessageIsRead).toHaveBeenCalledWith(id);
    });
  });
});

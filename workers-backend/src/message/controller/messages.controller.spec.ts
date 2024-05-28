// import { Test, TestingModule } from '@nestjs/testing';
// import { MessagesController } from './messages.controller';

// describe('MessagesController', () => {
//   let controller: MessagesController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [MessagesController],
//     }).compile();

//     controller = module.get<MessagesController>(MessagesController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });
import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from '../service/messages.service';
//import { Message } from 'src/schemas/message.entity';
import { Message,MessageSchema } from '../../schemas/message.entity';
import { Types } from 'mongoose';
describe('MessagesController', () => {
  let controller: MessagesController;
  let service: MessagesService;

  const mockMessage: Partial<Message> = {
    message_id: 1,
    sender_id: new Types.ObjectId(),
    receiver_id: new Types.ObjectId(),
    message_content: 'Test message content',
    date_time: new Date(),
    read_status: false,
    status: 'sent',
  };
  

  const mockMessagesService = {
    getMessagesByEmployeeId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [
        {
          provide: MessagesService,
          useValue: mockMessagesService,
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
      const employeeId = '60d9c6f3f9b5b61710f0f4f4';
      const messages = [mockMessage];
      mockMessagesService.getMessagesByEmployeeId.mockResolvedValueOnce(messages);

      const result = await controller.getMessagesByEmployeeId(employeeId);
      expect(result).toEqual(messages);
      expect(service.getMessagesByEmployeeId).toHaveBeenCalledWith(employeeId);
    });

    it('should throw HttpException if service throws error', async () => {
      const employeeId = '60d9c6f3f9b5b61710f0f4f4';
      mockMessagesService.getMessagesByEmployeeId.mockRejectedValueOnce(
        new HttpException('Invalid data', HttpStatus.BAD_REQUEST),
      );

      await expect(controller.getMessagesByEmployeeId(employeeId)).rejects.toThrow(HttpException);
    });
  });
});

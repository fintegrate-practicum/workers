import { Test, TestingModule } from '@nestjs/testing';
import { MessagesController } from './messages.controller';
import { MessagesService } from '../service/messages.service';

describe('MessagesController', () => {
    let messagesController: MessagesController;
    let messagesService: MessagesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MessagesController],
            providers: [
                {
                    provide: MessagesService,
                    useValue: {
                        updateMessageIsRead: jest.fn().mockResolvedValue({ message_id: '1', read_status: true }),
                    },
                },
            ],
        }).compile();

        messagesController = module.get<MessagesController>(MessagesController);
        messagesService = module.get<MessagesService>(MessagesService);
    });

    it('should be defined', () => {
        expect(messagesController).toBeDefined();
    });

    it('should call updateMessageIsRead and return the result', async () => {
        const id = '1';
        const result = { message_id: '1', read_status: true };

        expect(await messagesController.updateMessageIsRead(id)).toEqual(result);
        expect(messagesService.updateMessageIsRead).toHaveBeenCalledWith(id);
    });
});
import { Test } from '@nestjs/testing';
import { WorkersController } from './workers.controller';
import { WorkersService } from './workers.service';

describe('WorkersController', () => {
  let workersController: WorkersController;
  let workersService: WorkersService;

  beforeEach(async () => {
    const moduleRef  = await Test.createTestingModule({
        controllers: [WorkersController],
        providers: [WorkersService],
      }).compile();

      workersController = moduleRef.get<WorkersController>(WorkersController);
      workersService = moduleRef.get<WorkersService>(WorkersService);
  });

  describe('findAll', () => {
    it('should return an array of workers', async () => {
      const workersList = [
        {
          userId: 1,
          createdBy: 'John Doe',
          updateBy: 'Manager',
          createdAt: 2023,
          updateAt: 2024
        },
        {
          userId: 1,
          createdBy: 'Ron Noy',
          updateBy: 'Luis Nilsson',
          createdAt: 2022,
          updateAt: 2024
        }];
        jest.spyOn(workersService, 'findAll').mockResolvedValue(workersList);
      expect(await workersController.findAll()).toBe(workersList);
    });
  });
});

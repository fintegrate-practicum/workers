import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from '../service/tasks.service';
import { CreateTaskDto } from '../../dto/createTask.dto';
import { BadRequestException } from '@nestjs/common';
import { StatusEnum } from 'src/schemas/task.entity';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            createTask: jest.fn(),
            getAllTasks: jest.fn().mockResolvedValue(dynamicArry),
          },
        },
      ],
    }).compile();
    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });
  describe('create', () => {
    const taskData: CreateTaskDto = {
      businessId: 'Test Company',
      taskName: 'Test Task',
      completionDate: new Date(0),
      description: 'efrat',
      managerId: 'Test managerId',
      targetDate: new Date(0),
      employee: ['123', '234'],
      status: StatusEnum.Completed,
      urgency: 2,
    };
    it('should call service.createTask with dto', async () => {
      const spy = jest.spyOn(service, 'createTask').mockResolvedValue(taskData);
      const result = await controller.createTask(taskData);
      expect(spy).toHaveBeenCalledWith(taskData);
      expect(result).toEqual(taskData);
    });
    it('result should be equal to TaskStub', async () => {
      const taskStub = { ...taskData };
      jest.spyOn(service, 'createTask').mockResolvedValue(taskStub);
      const result = await controller.createTask(taskData);
      expect(result).toEqual(taskStub);
    });
    it('should throw BadRequestException if creation fails', async () => {
      jest
        .spyOn(service, 'createTask')
        .mockRejectedValue(new BadRequestException('Invalid data'));
      await expect(controller.createTask(taskData)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
<<<<<<< Updated upstream
=======
  const managerId = '123';
  const dynamicArry = [
    {
      businessId: 'Test Company',
      taskName: 'Test Task',
      completionDate: new Date(0),
      description: 'efrat',
      managerId: 'Test managerId',
      targetDate: new Date(0),
      employee: ['123', '234'],
      status: StatusEnum.Completed,
      urgency: 2,
    },
    {
      businessId: 'Test Company',
      taskName: 'Test Task',
      completionDate: new Date(0),
      description: 'efrat',
      managerId: 'Test managerId',
      targetDate: new Date(0),
      employee: ['123', '234'],
      status: StatusEnum.Completed,
      urgency: 2,
    },
  ];
  describe('getAllTasks', () => {
    let result;

    beforeEach(async () => {
      jest.spyOn(service, 'getAllTasks');
      result = await controller.getAllTasks(managerId);
    });

    it('should call service.getAllTasks with managerId', () => {
      expect(service.getAllTasks).toBeCalledWith(managerId);
    });

    it('result should be equal to dynamicArry', () => {
      expect(result).toEqual(dynamicArry);
    });
  });
>>>>>>> Stashed changes
});

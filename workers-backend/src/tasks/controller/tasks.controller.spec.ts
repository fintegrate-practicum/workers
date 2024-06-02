import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from '../service/tasks.service';
import { CreateTaskDto } from '../../dto/createTask.dto';
import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
import { TaskStatus } from '../../enum/taskStatus.enum';
import { UpdateTaskEmployeeDto } from '../../dto/updateTaskEmployee.dto';
import { UpdateTaskManagerDto } from '../../dto/updateTaskManager.dto';

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
            updateTaskEmployee: jest.fn(),
            updateTaskManager: jest.fn(),
            deleteTask: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = await module.resolve(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  describe('createTask', () => {
    const taskData: CreateTaskDto = {
      taskId: '123',
      businessId: 'Test Company',
      taskName: 'Test Task',
      completionDate: new Date(0),
      description: 'description',
      managerId: 'Test managerId',
      targetDate: new Date(0),
      employee: new Types.ObjectId['123'](),
      status: TaskStatus.Completed,
      urgency: 2,
    };

    it('should call service.createTask with dto', async () => {
      const mockResult = { ...taskData };
      jest.spyOn(service, 'createTask').mockResolvedValue(mockResult);

      const result = await controller.createTask(taskData);

      expect(service.createTask).toHaveBeenCalledWith(taskData);
      expect(result).toEqual(mockResult);
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
  const managerId = '2';
  const businessId = '2';

  const dynamicArry = [
    {
      businessId: 'Test Company',
      taskName: 'Test Task',
      completionDate: new Date(0),
      description: 'efrat',
      managerId: 'Test managerId',
      targetDate: new Date(0),
      employee: new Types.ObjectId['123'](),
      status: TaskStatus.Completed,
      urgency: 2,
    },
    {
      businessId: 'Test Company',
      taskName: 'Test Task',
      completionDate: new Date(0),
      description: 'efrat',
      managerId: 'Test managerId',
      targetDate: new Date(0),
      employee: new Types.ObjectId['123'](),
      status: TaskStatus.Completed,
      urgency: 2,
    },
  ];
  describe('getAllManagerTasks', () => {
    let result;
    beforeEach(async () => {
      jest.spyOn(service, 'getAllManagerTasks');
      result = await controller.getAllManagerTasks(businessId, managerId);
    });

    it('should call service.getAllTasks with managerId', () => {
      expect(service.getAllManagerTasks).toBeCalledWith(managerId);
    });

    it('result should be equal to dynamicArry', () => {
      expect(result).toEqual(dynamicArry);
    });
  });
  describe('updateTaskEmployee', () => {
    const taskData: UpdateTaskEmployeeDto = {
      status: TaskStatus.InProgress,
      description: 'new description',
    };

    it('should call service.updateTaskEmployee with dto', async () => {
      const mockTask = {
        ...taskData,
        taskId: '123',
        businessId: 'Test Company',
        taskName: 'Test Task',
        completionDate: new Date(0),
        managerId: 'Test managerId',
        targetDate: new Date(0),
        employee: new Types.ObjectId['123'](),
        urgency: 2,
      };
      jest.spyOn(service, 'updateTaskEmployee').mockResolvedValue(mockTask);
      const result = await controller.updateTaskEmployee('123', taskData);
      expect(service.updateTaskEmployee).toHaveBeenCalledWith('123', taskData);
      expect(result).toEqual(mockTask);
    });
  });
  describe('updateTaskManager', () => {
    const taskData: UpdateTaskManagerDto = {
      taskName: 'Test task name',
      description: 'new description',
      targetDate: new Date(),
      employee: new Types.ObjectId['123'](),
      status: TaskStatus.InProgress,
    };

    it('should call service.updateTaskManager with dto', async () => {
      const mockTask = {
        ...taskData,
        taskId: '123',
        businessId: 'Test Company',
        taskName: 'Test Task',
        completionDate: new Date(0),
        managerId: 'Test managerId',
        targetDate: new Date(0),
        employee: new Types.ObjectId['123'](),
        urgency: 2,
      };
      jest.spyOn(service, 'updateTaskManager').mockResolvedValue(mockTask);
      const result = await controller.updateTaskManager('123', taskData);
      expect(service.updateTaskManager).toHaveBeenCalledWith('123', taskData);
      expect(result).toEqual(mockTask);
    });
  });

  describe('deleteTask', () => {
    const taskId = '123';
    it('should call service.deleteTask with taskId', async () => {
      const mockTask = {
        taskId: '123',
        businessId: 'Test Company',
        taskName: 'Test Task',
        completionDate: new Date(0),
        description: 'Test description',
        managerId: 'Test managerId',
        targetDate: new Date(0),
        employee: new Types.ObjectId['123'](),
        status: TaskStatus.Completed,
        urgency: 2,
      };
      jest.spyOn(service, 'deleteTask').mockResolvedValue(mockTask);
      const result = await controller.deleteTask(taskId);
      expect(service.deleteTask).toHaveBeenCalledWith(taskId);
      expect(result).toEqual(mockTask);
    });
  });
});

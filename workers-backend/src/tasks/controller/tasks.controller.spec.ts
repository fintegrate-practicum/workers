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
      businessId: new Types.ObjectId('123'),
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
  const businessId = new Types.ObjectId('123');

  const dynamicArry = [
    {
      businessId: new Types.ObjectId('123'),
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
      businessId: new Types.ObjectId('123'),
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
  describe('updateTask', () => {
    describe('updateTask with manager role', () => {
      const taskData: UpdateTaskManagerDto = {
        taskName: 'Test task name',
        description: 'new description',
        targetDate: new Date(),
        employee: new Types.ObjectId['123'](),
        status: TaskStatus.InProgress,
      };

      it('should call service.updateTask with manager DTO', async () => {
        const mockTask = {
          ...taskData,
          businessId: new Types.ObjectId('123'),
          completionDate: new Date(0),
          managerId: 'Test managerId',
          urgency: 2,
        };
        jest.spyOn(service, 'updateTask').mockResolvedValue(mockTask);
        const result = await controller.updateTask('123', taskData, 'manager');
        expect(service.updateTask).toHaveBeenCalledWith('123', taskData);
        expect(result).toEqual(mockTask);
      });
    });

    describe('updateTask with employee role', () => {
      const taskData: UpdateTaskEmployeeDto = {
        status: TaskStatus.InProgress,
        description: 'new description',
      };

      it('should call service.updateTask with employee DTO', async () => {
        const mockTask = {
          ...taskData,
          businessId: new Types.ObjectId('123'),
          taskName: 'Test Task',
          completionDate: new Date(0),
          managerId: 'Test managerId',
          targetDate: new Date(0),
          employee: new Types.ObjectId['123'](),
          urgency: 2,
        };
        jest.spyOn(service, 'updateTask').mockResolvedValue(mockTask);
        const result = await controller.updateTask('123', taskData, 'employee');
        expect(service.updateTask).toHaveBeenCalledWith('123', taskData);
        expect(result).toEqual(mockTask);
      });
    });
  });

  describe('deleteTask', () => {
    it('should call service.deleteTask with taskId', async () => {
      const mockTask = {
        businessId: new Types.ObjectId('123'),
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
      const result = await controller.deleteTask('123');
      expect(service.deleteTask).toHaveBeenCalledWith('123');
      expect(result).toEqual(mockTask);
    });
  });
});

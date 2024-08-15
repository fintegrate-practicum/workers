import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from '../service/tasks.service';
import { CreateTaskDto } from '../../dto/createTask.dto';
import { UpdateTaskEmployeeDto } from '../../dto/updateTaskEmployee.dto';
import { UpdateTaskManagerDto } from '../../dto/updateTaskManager.dto';
import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
import { TaskStatus } from '../../enum/taskStatus.enum';
import { HttpModule } from '@nestjs/axios';
import { Task } from 'src/schemas/task.entity';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  const validObjectId = new Types.ObjectId().toHexString();

  const mockTask: Partial<Task> = {
    businessId: new Types.ObjectId(validObjectId),
    taskName: 'Test Task',
    managerId: 'Test managerId',
    description: 'efrat',
    targetDate: new Date(0),
    employee: [new Types.ObjectId(validObjectId)],
    urgency: 2,
    status: TaskStatus.Completed,
    completionDate: new Date(0),
    directLink: 'http://localhost:3001/api#/Workers/WorkersController_create',
  };

  const dynamicArry = [
    {
      businessId: new Types.ObjectId(validObjectId),
      taskName: 'Test Task',
      completionDate: new Date(0),
      description: 'efrat',
      managerId: 'Test managerId',
      targetDate: new Date(0),
      employee: new Types.ObjectId(validObjectId),
      status: TaskStatus.Completed,
      urgency: 2,
    },
    {
      businessId: new Types.ObjectId(validObjectId),
      taskName: 'Test Task',
      completionDate: new Date(0),
      description: 'efrat',
      managerId: 'Test managerId',
      targetDate: new Date(0),
      employee: new Types.ObjectId(validObjectId),
      status: TaskStatus.Completed,
      urgency: 2,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            createTask: jest.fn(),
            getAllTasks: jest.fn().mockResolvedValue(dynamicArry),
            updateTask: jest.fn(),
            deleteTask: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  describe('createTask', () => {
    const taskData: CreateTaskDto = {
      directLink: 'http://localhost:3001/api#/Workers/WorkersController_create',
      businessId: new Types.ObjectId(validObjectId),
      taskName: 'Test Task',
      completionDate: new Date(0),
      description: 'description',
      managerId: 'Test managerId',
      targetDate: new Date(0),
      employee: [new Types.ObjectId(validObjectId)],
      status: TaskStatus.Completed,
      urgency: 2,
    };
    it('should call service.createTask with dto and return the created task', async () => {
      const mockResult: Partial<Task> = { ...mockTask };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jest.spyOn(service, 'createTask').mockResolvedValue(mockResult as any);
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

  describe('getAllManagerTasks', () => {
    let result;
    beforeEach(async () => {
      jest.spyOn(service, 'getAllTasks');
      result = await controller.getAllManagerTasks(managerId);
    });

    it('should call service.getAllTasks with managerId', () => {
      expect(service.getAllTasks).toBeCalledWith(managerId);
    });

    it('result should be equal to dynamicArry', () => {
      expect(result).toEqual(dynamicArry);
    });
  });

  describe('updateTask', () => {
    const taskId = '123';
    const updateTaskEmployeeDto: UpdateTaskEmployeeDto = {
      description: 'Updated description',
      status: TaskStatus.InProgress,
    };
    const updateTaskManagerDto: UpdateTaskManagerDto = {
      taskName: 'Updated Task Name',
      description: 'Updated description',
      employee: [new Types.ObjectId(validObjectId)],
      targetDate: new Date(),
      status: TaskStatus.InProgress,
    };

    it('should call service.updateTask with manager role', async () => {
      const updatedTask: Partial<Task> = {
        ...mockTask,
        ...updateTaskManagerDto,
      };
      jest.spyOn(service, 'updateTask').mockResolvedValue(updatedTask as Task);

      const result = await controller.updateTask(
        taskId,
        updateTaskManagerDto,
        'manager',
      );

      expect(service.updateTask).toHaveBeenCalledWith(
        taskId,
        updateTaskManagerDto,
      );
      expect(result).toEqual(updatedTask);
    });

    it('should call service.updateTask with employee role', async () => {
      const updatedTask: Partial<Task> = {
        ...mockTask,
        ...updateTaskEmployeeDto,
        taskName: mockTask.taskName,
        targetDate: mockTask.targetDate,
        employee: mockTask.employee,
        urgency: mockTask.urgency,
        directLink: mockTask.directLink,
        businessId: mockTask.businessId,
        managerId: mockTask.managerId,
      };
      jest.spyOn(service, 'updateTask').mockResolvedValue(updatedTask as Task);

      const result = await controller.updateTask(
        taskId,
        updateTaskEmployeeDto,
        'employee',
      );

      expect(service.updateTask).toHaveBeenCalledWith(
        taskId,
        updateTaskEmployeeDto,
      );
      expect(result).toEqual(updatedTask);
    });

    it('should throw BadRequestException if invalid role is provided', async () => {
      await expect(
        controller.updateTask(taskId, updateTaskEmployeeDto, 'invalidRole'),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('deleteTask', () => {
    it('should call service.deleteTask with taskId', async () => {
      jest.spyOn(service, 'deleteTask').mockResolvedValue(mockTask as Task);
      const result = await controller.deleteTask('123');
      expect(service.deleteTask).toHaveBeenCalledWith('123');
      expect(result).toEqual(mockTask);
    });
  });
});

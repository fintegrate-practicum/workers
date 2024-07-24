import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task } from '../../schemas/task.entity';
import { UserService } from '../../user/services/users.service';
import { RabbitPublisherService } from '../../rabbit-publisher/rabbit-publisher.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from '../../dto/createTask.dto';
import { UpdateTaskManagerDto } from '../../dto/updateTaskManager.dto';
import { TaskStatus } from '../../enum/taskStatus.enum';

const mockTask = {
  _id: new Types.ObjectId(),
  taskName: 'Test Task',
  description: 'Task description',
  targetDate: new Date(),
  employee: [new Types.ObjectId()],
  managerId: new Types.ObjectId(),
  businessId: new Types.ObjectId(),
  urgency: 1,
  status: TaskStatus.ToDo,
  completionDate: null,
  directLink: 'http://example.com',
};

const mockTaskModel = {
  find: jest.fn(),
  findOneAndUpdate: jest.fn().mockImplementation((filter, update, options) => ({
    exec: jest.fn().mockResolvedValue({ ...mockTask, ...update }), // שמירה על התוצאה המעודכנת
  })),
  findOneAndDelete: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockTask),
  }),
  create: jest.fn().mockResolvedValue(mockTask),
  save: jest.fn().mockResolvedValue(mockTask),
};

describe('TasksService', () => {
  let service: TasksService;
  let model: Model<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: getModelToken(Task.name), useValue: mockTaskModel },
        { provide: UserService, useValue: { findOneByUserId: jest.fn().mockResolvedValue({ userName: 'User', userEmail: 'user@example.com' }) } },
        { provide: RabbitPublisherService, useValue: { publishMessageToCommunication: jest.fn() } },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    model = module.get<Model<Task>>(getModelToken(Task.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTask', () => {
    it('should create a new task', async () => {
      const createTaskDto: CreateTaskDto = {
        businessId: new Types.ObjectId(),
        taskName: 'New Task',
        managerId: 'managerId',
        description: 'Task description',
        targetDate: new Date(),
        employee: [new Types.ObjectId()],
        urgency: 1,
        status: TaskStatus.ToDo,
        completionDate: null,
        directLink: 'http://example.com',
      };

      const result = await service.createTask(createTaskDto);

      expect(result).toEqual(mockTask);
      expect(mockTaskModel.create).toHaveBeenCalledWith(createTaskDto);
    });

    it('should throw an error if task data is invalid', async () => {
      await expect(service.createTask(null)).rejects.toThrow(BadRequestException);
    });
  });

  describe('getAllTasks', () => {
    it('should return all tasks for a manager', async () => {
      model.find = jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue([mockTask]) });

      const result = await service.getAllTasks(mockTask.managerId.toString());

      expect(result).toEqual([mockTask]);
      expect(model.find).toHaveBeenCalledWith({ managerId: mockTask.managerId.toString() });
    });

    it('should throw an error if managerId is not provided', async () => {
      await expect(service.getAllTasks(null)).rejects.toThrow(BadRequestException);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      mockTaskModel.findOneAndDelete = jest.fn().mockResolvedValue(mockTask);

      const result = await service.deleteTask(mockTask._id.toString());

      expect(result).toEqual(mockTask);
      expect(mockTaskModel.findOneAndDelete).toHaveBeenCalledWith({ _id: mockTask._id.toString() });
    });

    it('should throw an error if taskId is not provided', async () => {
      await expect(service.deleteTask(null)).rejects.toThrow(BadRequestException);
    });

    it('should throw an error if task not found', async () => {
      mockTaskModel.findOneAndDelete = jest.fn().mockResolvedValue(null);

      await expect(service.deleteTask(mockTask._id.toString())).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateTask', () => {
    it('should update a task successfully', async () => {
      const updateTaskDto: UpdateTaskManagerDto = {
        taskName: 'Updated Task',
        description: 'Updated description',
        employee: [new Types.ObjectId()],
        targetDate: new Date(),
        status: TaskStatus.InProgress,
      };

      const updatedTask = { ...mockTask, ...updateTaskDto };

      (model.findOneAndUpdate as jest.Mock).mockResolvedValue(updatedTask);

      const result = await service.updateTask(mockTask._id.toString(), updateTaskDto);

      expect(result).toEqual(updatedTask);
      expect(model.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: mockTask._id.toString() },
        updateTaskDto,
        { new: true }
      );
    });

    it('should throw an error if taskId is not provided', async () => {
      await expect(service.updateTask(null, {
        description: '',
        status:TaskStatus.ToDo
      })).rejects.toThrow(BadRequestException);
    });

    it('should throw an error if task to be updated is not found', async () => {
      (model.findOneAndUpdate as jest.Mock).mockResolvedValue(null);

      await expect(service.updateTask(mockTask._id.toString(), {
        description: '',
        status: TaskStatus.ToDo
      })).rejects.toThrow(NotFoundException);
    });
  });
});

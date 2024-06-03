import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './TasksService';
import { getModelToken } from '@nestjs/mongoose';
import { Task } from '../../schemas/task.entity';
import { Model } from 'mongoose';

describe('TasksService', () => {
  let service: TasksService;
  let model;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken(Task.name),
          useValue: {
            new: jest.fn().mockResolvedValue({ save: jest.fn() }),
            create: jest.fn(),
          },
        },
      ],
    }).compile();
    service = module.get<TasksService>(TasksService);
    model = module.get<Model<Task>>(getModelToken(Task.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

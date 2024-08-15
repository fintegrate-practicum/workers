import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from './services/admin.service';
import { getModelToken } from '@nestjs/mongoose';
import { Employee } from '../schemas/Employee.entity';
import { User } from '../schemas/user.entity';
import { HttpModule } from '@nestjs/axios';

describe('AdminController', () => {
  let controller: AdminController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AdminController],
      providers: [
        AdminService,
        {
          provide: getModelToken(Employee.name),
          useValue: {},
        },
        {
          provide: getModelToken(User.name),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<AdminController>(AdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

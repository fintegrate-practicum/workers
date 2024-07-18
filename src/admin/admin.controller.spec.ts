import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from './services/admin.service';
import { getModelToken } from '@nestjs/mongoose';
import { Employee } from '../schemas/Employee.entity';
import { User } from '../schemas/user.entity';

describe('AdminController', () => {
  let controller: AdminController;
  let adminService: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        AdminService,
        {
          provide: getModelToken(Employee.name),
          useValue: {
            // mock model methods if necessary
          },
        },
        {
          provide: getModelToken(User.name),
          useValue: {
            // mock model methods if necessary
          },
        },
      ],

    }).compile();

    controller = module.get<AdminController>(AdminController);
    adminService = module.get<AdminService>(AdminService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

it('always returns true', () => {
  expect(true).toBe(true);
});

});


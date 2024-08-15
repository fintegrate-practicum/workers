import { getModelToken } from '@nestjs/mongoose';
import { Employee } from '../schemas/Employee.entity';
import { User } from '../schemas/user.entity';
import { HttpModule } from '@nestjs/axios';
import { AdminController } from './admin.controller';
import { AdminService } from './services/admin.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AdminController', () => {
  let controller: AdminController;
  let adminService: AdminService;

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
    adminService = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUserById', () => {
    it('should return a user by ID', async () => {
      const userId = '123';
      const expectedUser = {
        _id: userId,
        userName: 'Test User',
        userEmail: 'test@example.com',
        auth0_user_id: 'auth0|123456',
        registeredAt: new Date(),
        lastLogin: new Date(),
        mobile: '123-456-7890',
        status: 'Bachelor',
        dateOfBirth: new Date(),
        address: { city: 'City', street: 'Street', num: 10 },
        phone: '098-765-4321',
        businessRoles: [{ businessId: 'biz123', role: 'admin' }],
      } as User;

      jest.spyOn(adminService, 'getUserById').mockResolvedValue(expectedUser);

      const result = await controller.getUserById(userId);
      expect(result).toEqual(expectedUser);
      expect(adminService.getUserById).toHaveBeenCalledWith(userId);
    });
  });

  describe('getUsersByBusinessId', () => {
    it('should return users by business ID', async () => {
      const businessId = 'business123';
      const expectedUsers = [
        {
          _id: '1',
          userName: 'User 1',
          businessRoles: [{ businessId, role: 'admin' }],
        },
        {
          _id: '2',
          userName: 'User 2',
          businessRoles: [{ businessId, role: 'client' }],
        },
      ] as User[];

      jest
        .spyOn(adminService, 'getUsersByBusinessId')
        .mockResolvedValue(expectedUsers);

      const result = await controller.getUsersByBusinessId(businessId);
      expect(result).toEqual(expectedUsers);
      expect(adminService.getUsersByBusinessId).toHaveBeenCalledWith(
        businessId,
      );
    });
  });

  describe('getClientsByBusinessId', () => {
    it('should return clients by business ID', async () => {
      const businessId = 'business456';
      const expectedClients = [
        {
          _id: '3',
          userName: 'Client 1',
          businessRoles: [{ businessId, role: 'client' }],
        },
        {
          _id: '4',
          userName: 'Client 2',
          businessRoles: [{ businessId, role: 'client' }],
        },
      ] as User[];

      jest
        .spyOn(adminService, 'getClientsByBusinessId')
        .mockResolvedValue(expectedClients);

      const result = await controller.getClientsByBusinessId(businessId);
      expect(result).toEqual(expectedClients);
      expect(adminService.getClientsByBusinessId).toHaveBeenCalledWith(
        businessId,
      );
    });
  });
});

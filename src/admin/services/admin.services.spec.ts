import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from '../../schemas/employee.entity';
import { User } from '../../schemas/user.entity';

describe('AdminService', () => {
  let adminService: AdminService;
  let employeeModel: Model<Employee>;
  let userModel: Model<User>;

  const mockEmployees: Employee[] = [
    { code: '1', createdBy: 'Dan', updatedBy: 'yoel', } as any,
    { code: '2', createdBy: 'aviv', updatedBy: 'avi' } as any,
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: getModelToken(Employee.name),
          useValue: {
            find: jest.fn().mockResolvedValue(mockEmployees),
            findById: jest.fn().mockImplementation((code: string) => ({
              exec: jest.fn().mockResolvedValue(
                mockEmployees.find((e) => e.code === code) || null
              ),
            })),
          },
        },
        {
          provide: getModelToken(User.name),
          useValue: {
            // mock model
          },
        },
      ],
    }).compile();

    adminService = module.get<AdminService>(AdminService);
    employeeModel = module.get<Model<Employee>>(getModelToken(Employee.name));
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  describe('getEmployee', () => {
    it('should return an employee by ID', async () => {
      const employeeId = '1';
      const result = await adminService.getEmployee(employeeId);
      const expectedEmployee = mockEmployees.find((e) => e.code === employeeId);
      expect(result).toEqual(expectedEmployee);
    });

    it('should return null for non-existent employee ID', async () => {
      const nonExistentId = '3';
      const result = await adminService.getEmployee(nonExistentId);
      expect(result).toBeNull();
    });

  });

});

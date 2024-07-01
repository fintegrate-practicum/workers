import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from 'src/schemas/employee.entity';
import {User} from '../schemas/user.entity';
describe('AdminService', () => {
  let adminService: AdminService;
  let model: Model<Employee>;

  const mockEmployees: Employee[] = [
    { code: '1', createdBy: 'Dan', updatedBy: 'yoel', position: 'Manager' },
    { code: '2', createdBy: 'aviv', updatedBy: 'avi', position: 'Developer' },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: getModelToken(Employee.name),
          useValue: {
            find: jest.fn().mockResolvedValue(mockEmployees),
            findById: jest.fn().mockImplementation((code: string) => {
              return mockEmployees.find((e) => e.code === code);
            }),
          },
        },
      ],
    }).compile();

    adminService = module.get<AdminService>(AdminService);
    model = module.get<Model<Employee>>(getModelToken(Employee.name));
  });

  describe('findAllByBusinessId', () => {
    it('should return employees by business ID', async () => {
      const businessId = '123456789'; // Specify the business ID
      const result = await adminService.findAllByBusinessId(businessId);
      expect(result.employees).toEqual(mockEmployees);
      expect(result.total).toEqual(mockEmployees.length);
    });
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

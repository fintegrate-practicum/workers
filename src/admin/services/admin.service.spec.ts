import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from 'src/schemes/employee.entity';

describe('AdminService', () => {
  let adminService: AdminService;
  let model: Model<Employee>;

  const mockEmployees: Employee[] = [
    { id: '1',  createdBy: "Dan", updatedBy: "yoel", position: 'Manager' },
    { id: '2',  createdBy: "aviv", updatedBy: "avi",position: 'Developer' },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: getModelToken(Employee.name),
          useValue: {
            find: jest.fn().mockResolvedValue(mockEmployees),
            findById: jest.fn().mockImplementation((id: string) => {
              return mockEmployees.find(e => e.id === id);
            }),
          },
        },
      ],
    }).compile();

    adminService = module.get<AdminService>(AdminService);
    model = module.get<Model<Employee>>(getModelToken(Employee.name));
  });

  describe('findAll', () => {
    it('should return all employees', async () => {
      const result = await adminService.findAll();
      expect(result).toEqual(mockEmployees);
    });
  });

  describe('getEmployee', () => {
    it('should return an employee by ID', async () => {
      const employeeId = '1';
      const result = await adminService.getEmployee(employeeId);
      const expectedEmployee = mockEmployees.find(e => e.id === employeeId);
      expect(result).toEqual(expectedEmployee);
    });

    it('should return null for non-existent employee ID', async () => {
      const nonExistentId = '3';
      const result = await adminService.getEmployee(nonExistentId);
      expect(result).toBeNull();
    });
  });
});

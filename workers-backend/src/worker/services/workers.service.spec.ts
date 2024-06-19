import { Test, TestingModule } from '@nestjs/testing';
import { WorkersService } from '../services/workers.service';
import { getModelToken } from '@nestjs/mongoose';
import { Employee } from '../../schemas/employee.entity';
import { Model, Types } from 'mongoose';
import { EMPTY } from 'rxjs';
import { RoleValidationSchema } from '../validations/worker.validationSchema';
import { workerValidationsSchema } from '../validations/worker.validations.schema';

describe('WorkersService', () => {
  let workersService: WorkersService;
  let model: Model<Employee>;
  const mockEmployee: Employee[] = [
    new Employee({
      businessId: '123',
      code: 'EMP001',
      createdBy: 'admin',
      updatedBy: 'admin',
      role: {
        type: 'aa',
        activate: false,
        description: 'developer',
      },
    }),
    new Employee({
      businessId: '123',
      code: 'EMP001',
      createdBy: 'admin',
      updatedBy: 'admin',
      role: {
        type: 'aa',
        activate: false,
        description: 'developer',
      },
    }),
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkersService,
        {
          provide: getModelToken('Employee'),
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            find: jest.fn(),
            countDocuments: jest.fn(),
          },
        },
      ],
    }).compile();
    workersService = module.get<WorkersService>(WorkersService);
    model = module.get<Model<Employee>>(getModelToken('Employee'));
  });

  describe('createEmployee', () => {
    it('should create and return an employee', async () => {
      jest
        .spyOn(model, 'create')
        .mockResolvedValueOnce([mockEmployee[0]] as any);
      const newEmployee : workerValidationsSchema = {
        businessId: '123456',
        createdBy: 'John Doe',
        code: 'bb',
        updateBy: 'aa',
        role: new RoleValidationSchema
      };
      const result = await workersService.createEmployee(newEmployee);
      expect(result).toEqual(mockEmployee[0]);
    });
  });

  describe('getEmployee', () => {
    it('should find and return an employee by ID', async () => {
      jest.spyOn(model, 'findById').mockResolvedValueOnce(mockEmployee[0]);
      const result = await workersService.getEmployee(mockEmployee[0].code);
      expect(result).toEqual(mockEmployee[0]);
    });

    it('should handle error when employee is not found', async () => {
      jest.spyOn(model, 'findById').mockResolvedValueOnce(null);
      await expect(
        workersService.getEmployee('nonExistentCode'),
      ).rejects.toThrowError();
    });
  });

  describe('updateEmployee', () => {
    it('should update and return an employee by ID', async () => {
      jest
        .spyOn(model, 'findByIdAndUpdate')
        .mockResolvedValueOnce(mockEmployee[0]);
      const updatedEmployeeData = new Employee({
        roleId: 20,
        createdBy: 'Dan',
        updatedBy: 'Yon',
      });
      const result = await workersService.updateEmployee(
        mockEmployee[0].code,
        updatedEmployeeData,
      );
      expect(result).toEqual(mockEmployee[0]);
    });

    it('should handle error when updating employee fails', async () => {
      jest
        .spyOn(model, 'findByIdAndUpdate')
        .mockRejectedValueOnce(new Error('Update failed'));
      const updatedEmployeeData = new Employee({
        code: '1',
        roleId: new Types.ObjectId(),
        createdBy: 'Dan',
        updatedBy: 'Yon',
      });
      await expect(
        workersService.updateEmployee(
          mockEmployee[0].code,
          updatedEmployeeData,
        ),
      ).rejects.toThrowError('Update failed');
    });
  });

  describe('deleteEmployee', () => {
    it('should delete and return an employee by ID', async () => {
      jest
        .spyOn(model, 'findByIdAndDelete')
        .mockResolvedValueOnce(mockEmployee[0]);
      const result = await workersService.deleteEmployee(mockEmployee[0].code);
      expect(result).toEqual(mockEmployee[0]);
    });

    it('should handle error when deleting employee fails', async () => {
      jest
        .spyOn(model, 'findByIdAndDelete')
        .mockRejectedValueOnce(new Error('Deletion failed'));
      await expect(
        workersService.deleteEmployee('invalidCode'),
      ).rejects.toThrowError('Deletion failed');
    });
  });

  describe('findAllByBusinessId', () => {
    it('should find and return employees by business ID', async () => {
      const businessId = '123456789';
      const mockEmployees = [mockEmployee[0], mockEmployee[1]];
      jest.spyOn(model, 'find').mockResolvedValueOnce(mockEmployees);
      jest.spyOn(model, 'countDocuments').mockResolvedValueOnce(2);
      const result = await workersService.findAllByBusinessId(businessId);
      expect(result).toEqual(mockEmployees);
    });
  });
});

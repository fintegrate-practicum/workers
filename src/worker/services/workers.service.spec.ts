import { Test, TestingModule } from '@nestjs/testing';
import { WorkersService } from './workers.service';
import { getModelToken } from '@nestjs/mongoose';
import { Employee } from 'src/schemas/employee.entity';
import { Model, Types } from 'mongoose';

describe('WorkersService', () => {
  let workersService: WorkersService;
  let model: Model<Employee>;

  const mockEmployee = {
    code: '1',
    roleId: 30,
    createdBy: 'Dan',
    updatedBy: 'Yon',
  };

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
      jest.spyOn(model, 'create').mockResolvedValue(mockEmployee);

      const newEmployee: Employee = {
        code: '1',
        roleId: 30,
        createdBy: 'Dan',
        updatedBy: 'Yon',
      };

      const result = await workersService.createEmployee(newEmployee);
      expect(result).toEqual(mockEmployee);
    });
  });

  describe('getEmployee', () => {
    it('should find and return an employee by ID', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(mockEmployee);

      const result = await workersService.getEmployee(mockEmployee.code);
      expect(result).toEqual(mockEmployee);
    });

    it('should handle error when employee is not found', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(null);

      try {
        await workersService.getEmployee('nonExistentCode');
        fail('Expected an error to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('updateEmployee', () => {
    it('should update and return an employee by ID', async () => {
      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue(mockEmployee);

      const updatedEmployeeData: Employee = {
        roleId: 20,
        createdBy: 'Dan',
        updatedBy: 'Yon',
      };

      const result = await workersService.updateEmployee(mockEmployee.code, updatedEmployeeData);
      expect(result).toEqual(mockEmployee);
    });

    it('should handle error when updating employee fails', async () => {
      jest.spyOn(model, 'findByIdAndUpdate').mockRejectedValue(new Error('Update failed'));

      const updatedEmployeeData: Employee = {
        code: '1',
        roleId: new Types.ObjectId(),
        createdBy: 'Dan',
        updatedBy: 'Yon',
      };

      try {
        await workersService.updateEmployee(mockEmployee.code, updatedEmployeeData);
        fail('Expected an error to be thrown');
      } catch (error) {
        expect(error.message).toEqual('Update failed');
      }
    });
  });

  describe('deleteEmployee', () => {
    it('should delete and return an employee by ID', async () => {
      jest.spyOn(model, 'findByIdAndDelete').mockResolvedValue(mockEmployee);

      const result = await workersService.deleteEmployee(mockEmployee.code);
      expect(result).toEqual(mockEmployee);
    });

    it('should handle error when deleting employee fails', async () => {
      jest.spyOn(model, 'findByIdAndDelete').mockRejectedValue(new Error('Deletion failed'));

      try {
        await workersService.deleteEmployee('invalidCode');
        fail('Expected an error to be thrown');
      } catch (error) {
        expect(error.message).toEqual('Deletion failed');
      }
    });
  });

  describe('findAllByBusinessId', () => {
    it('should find and return employees by business ID', async () => {
      const businessId = '123456789'; 
      const mockEmployees = [mockEmployee, mockEmployee];  
      jest.spyOn(model, 'find').mockResolvedValue(mockEmployees);
      jest.spyOn(model, 'countDocuments').mockResolvedValue(2);

      const result = await workersService.findAllByBusinessId(businessId);
      expect(result.employees).toEqual(mockEmployees);
      expect(result.total).toEqual(2);
    });
  });
});

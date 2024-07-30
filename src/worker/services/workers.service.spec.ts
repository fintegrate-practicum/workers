import { Test, TestingModule } from '@nestjs/testing';
import { WorkersService } from '../services/workers.service';
import { getModelToken } from '@nestjs/mongoose';
import {  Error, Model } from 'mongoose';
import { Employee } from '../../schemas/employee.entity';
import { Role } from '../../schemas/EmployeeRole.entity'; 
import { Types } from 'mongoose';
import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { workerValidationsSchema } from '../validations/worker.validations.schema';

const mockEmployee = {
  _id: new Types.ObjectId(),
  userId: '12345',
  businessId: new Types.ObjectId(),
  nameEmployee: 'John Doe',
  code: 'EMP001',
  createdBy: 'admin',
  updatedBy: 'admin',
} as Employee;

const mockEmployeeModel = {
  create: jest.fn().mockResolvedValue(mockEmployee),
  find: jest.fn().mockImplementation(() => ({
    exec: jest.fn().mockResolvedValue([mockEmployee, mockEmployee]), // מתן תוצאה שווה לשני עובדים
  })),
  findOne: jest.fn().mockResolvedValue(mockEmployee),
  findOneAndUpdate: jest.fn().mockImplementation((filter, update, options) => ({
    exec: jest.fn().mockResolvedValue({ ...mockEmployee, ...update }), 
  })),
  findByIdAndUpdate: jest.fn().mockResolvedValue(mockEmployee),
  findByIdAndDelete: jest.fn().mockResolvedValue(mockEmployee), 
  countDocuments: jest.fn().mockResolvedValue(2), 
  exec: jest.fn(),
};

describe('WorkersService', () => {
  let service: WorkersService;
  let model: Model<Employee>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkersService,
        {
          provide: getModelToken('Employee'),
          useValue: mockEmployeeModel,
        },
      ],
    }).compile();

    service = module.get<WorkersService>(WorkersService);
    model = module.get<Model<Employee>>(getModelToken('Employee'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createEmployee', () => {
    it('should throw BadRequestException if worker is not provided', async () => {
      await expect(service.createEmployee(null)).rejects.toThrow(BadRequestException);
    });

    it('should create and return an employee with valid data', async () => {
      const worker: workerValidationsSchema = {
        userId: '12345',
        businessId: new Types.ObjectId().toString(), // השתמש בסוג המתאים
        nameEmployee: 'John Doe',
        code: 'EMP001',
        createdBy: 'admin',
        updateBy: 'admin', 
        role: {
          type: 'developer',
          active: false,
          description: 'Developer Role',
        } as Role,
      };

      jest.spyOn(model, 'create').mockResolvedValueOnce(worker as any);

      const result = await service.createEmployee(worker);

      expect(result).toEqual(worker);

      expect(mockEmployeeModel.create).toHaveBeenCalledWith(worker);
    });

describe('getEmployeeByUserId', () => {
  it('should throw BadRequestException if userId is not provided', async () => {
    await expect(service.getEmployeeByUserId(null)).rejects.toThrow(BadRequestException);
  });

  it('should return an employee if found', async () => {
    const userId = '12345';

    jest.spyOn(mockEmployeeModel, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockEmployee),
    } as any);

    const result = await service.getEmployeeByUserId(userId);
    expect(result).toEqual(mockEmployee);
    expect(mockEmployeeModel.findOne).toHaveBeenCalledWith({ userId });
  });

  it('should throw HttpException if employee is not found', async () => {
    const userId = 'nonExistingUserId';

    jest.spyOn(mockEmployeeModel, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValue(null),
    } as any);

    await expect(service.getEmployeeByUserId(userId)).rejects.toHaveProperty('status', HttpStatus.NOT_FOUND);
  });

  it('should throw HttpException for internal server error', async () => {
    const userId = '12345';

    jest.spyOn(mockEmployeeModel, 'findOne').mockReturnValue({
      exec: jest.fn().mockRejectedValue(new Error('Some error')),
    } as any);

    await expect(service.getEmployeeByUserId(userId)).rejects.toHaveProperty('status', HttpStatus.INTERNAL_SERVER_ERROR);
  });
});

describe('getEmployeeByUserId', () => {
  it('should throw BadRequestException if userId is not provided', async () => {
    await expect(service.getEmployeeByUserId(null)).rejects.toThrow(BadRequestException);
  });

  it('should return an employee if found', async () => {
    const userId = '12345';

    jest.spyOn(mockEmployeeModel, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockEmployee),
    } as any);

    const result = await service.getEmployeeByUserId(userId);
    expect(result).toEqual(mockEmployee);
    expect(mockEmployeeModel.findOne).toHaveBeenCalledWith({ userId });
  });

  it('should throw HttpException if employee is not found', async () => {
    const userId = 'nonExistingUserId';

    jest.spyOn(mockEmployeeModel, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValue(null),
    } as any);

    await expect(service.getEmployeeByUserId(userId)).rejects.toHaveProperty('status', HttpStatus.NOT_FOUND);
  });

  it('should throw HttpException for internal server error', async () => {
    const userId = '12345';

    jest.spyOn(mockEmployeeModel, 'findOne').mockReturnValue({
      exec: jest.fn().mockRejectedValue(new Error('Some error')),
    } as any);

    await expect(service.getEmployeeByUserId(userId)).rejects.toHaveProperty('status', HttpStatus.INTERNAL_SERVER_ERROR);
  });
});

describe('deleteEmployee', () => {
  it('should delete and return an employee by ID', async () => {
    jest
      .spyOn(model, 'findByIdAndDelete')
      .mockResolvedValueOnce(mockEmployee);
    const result = await service.deleteEmployee(mockEmployee._id.toString());
    expect(result).toEqual(mockEmployee);
    expect(model.findByIdAndDelete).toHaveBeenCalledWith(mockEmployee._id.toString());
  });

  it('should handle error when deleting employee fails', async () => {
    jest
      .spyOn(model, 'findByIdAndDelete')
      .mockRejectedValueOnce(new Error('Deletion failed'));
    await expect(
      service.deleteEmployee('invalidCode'),
    ).rejects.toThrowError('Error deleting employee');
  });
    });

describe('findAllByBusinessId', () => {
  it('should find and return employees by business ID', async () => {
    const businessId = '123456789';
    const mockEmployees = [mockEmployee, mockEmployee];
    jest.spyOn(model, 'find').mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue(mockEmployees),
    }) as any);
    const result = await service.findAllByBusinessId(businessId);
    expect(result).toEqual(mockEmployees);
  });
});

  describe('updateEmployee', () => {
    it('should update and return an employee by ID', async () => {
      const userId = 'someId';
      const updatedEmployee = { userId, name: 'John Doe' } as unknown as Employee;
      const mockUpdatedEmployee = { ...updatedEmployee, position: 'Developer' } as unknown as Employee;
  
      (model.findOneAndUpdate as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUpdatedEmployee),
      });
  
      const result = await service.updateEmployeeByUserId(userId, updatedEmployee);
      expect(result).toEqual(mockUpdatedEmployee);
      expect(model.findOneAndUpdate).toHaveBeenCalledWith(
        { userId },
        updatedEmployee,
        { new: true },
      );
    });
  });
  
  it('should handle error when updating employee fails', async () => {
    const userId = 'someId';
    const updatedEmployee = { userId, name: 'John Doe' } as unknown as Employee;

    (model.findOneAndUpdate as jest.Mock).mockReturnValue({
      exec: jest.fn().mockRejectedValue(new HttpException('Error updating employee', HttpStatus.INTERNAL_SERVER_ERROR)),
    });

    await expect(service.updateEmployeeByUserId(userId, updatedEmployee)).rejects.toThrow(HttpException);
    await expect(service.updateEmployeeByUserId(userId, updatedEmployee)).rejects.toThrow('Error updating employee');
  });
});
});


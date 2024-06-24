import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { WorkersService } from '../services/workers.service';
import { WorkersController } from '../controllers/workers.controller';
import { Employee } from '../../schemas/employee.entity';
import { Types } from 'mongoose';
import { Role } from '../../schemas/employeeRole.entity';
import { DESTRUCTION } from 'dns';
import { workerValidationsSchema } from '../validations/worker.validations.schema';
import { RoleValidationSchema } from '../validations/worker.roleValidation.schema';

describe('WorkersController', () => {
  let controller: WorkersController;
  let service: WorkersService;

  const mockEmployee: Employee = {
    businessId: '123',
    code: 'EMP001',
    createdBy: 'admin',
    updatedBy: 'admin',
    role: {
      type: 'aa',
      activate: false,
      description: 'developer',
    } as unknown as Role,
  } as unknown as Employee;

  const mockWorkersService = {
    activateEmployee: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkersController],
      providers: [
        {
          provide: WorkersService,
          useValue: mockWorkersService,
        },
      ],
    }).compile();

    controller = module.get<WorkersController>(WorkersController);
    service = module.get<WorkersService>(WorkersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('activateEmployee', () => {
    it('should activate an employee successfully', async () => {
      const activatedEmployee = { ...mockEmployee, active: true };
      mockWorkersService.activateEmployee.mockResolvedValueOnce(
        activatedEmployee,
      );

      const result = await controller.activateEmployee(
        '60d9c6f3f9b5b61710f0f4f4',
      );

      expect(result).toEqual(activatedEmployee);
      expect(result.active).toBe(true);
      expect(service.activateEmployee).toHaveBeenCalledWith(
        '60d9c6f3f9b5b61710f0f4f4',
      );
    });

    it('should create a new employee', async () => {
      const requestBody: workerValidationsSchema = {
        businessId: '123456',
        createdBy: 'John Doe',
        code: 'bb',
        updateBy: 'aa',
        role: new RoleValidationSchema(),
      };

      const createdEmployee = {
        _id: 'someId',
        ...requestBody,
      };

      jest
        .spyOn(workersService, 'createEmployee')
        .mockResolvedValueOnce(createdEmployee as unknown as Employee);
      const result = await controller.create(requestBody);

      expect(result).toEqual(createdEmployee);
    });
    it('should activate an employee successfully', async () => {
      const activatedEmployee = { ...mockEmployee, active: true };
      mockWorkersService.activateEmployee.mockResolvedValueOnce(
        activatedEmployee,
      );

      const result = await controller.activateEmployee(
        '60d9c6f3f9b5b61710f0f4f4',
      );

      expect(result).toEqual(activatedEmployee);
      expect(result.active).toBe(true);
      expect(service.activateEmployee).toHaveBeenCalledWith(
        '60d9c6f3f9b5b61710f0f4f4',
      );
    });
  });

  it('should handle errors during employee creation', async () => {
    const requestBody: workerValidationsSchema = {
      businessId: '',
      code: '',
      createdBy: '',
      role: new RoleValidationSchema(),
      updateBy: '',
    };

    const errorMessage = 'Internal server error';

    jest
      .spyOn(workersService, 'createEmployee')
      .mockRejectedValueOnce(
        new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR),
      );

    try {
      await controller.create(requestBody);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe(errorMessage);
      expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  });
});

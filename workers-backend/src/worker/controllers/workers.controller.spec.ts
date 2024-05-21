import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { WorkersService } from '../services/workers.service';
import { WorkersController } from '../controllers/workers.controller';
import { Employee } from '../../schemas/employee.entity';
import { Types } from 'mongoose';

describe('WorkersController', () => {
  let controller: WorkersController;
  let service: WorkersService;

  const mockEmployee: Employee = {
    _id: '60d9c6f3f9b5b61710f0f4f4', // Example ObjectId
    userId: new Types.ObjectId(),
    businessId: 123,
    code: 'EMP001',
    createdBy: 'admin',
    updatedBy: 'admin',
    roleId: new Types.ObjectId(),
    active: false,
    signupTime: new Date(),
    position: 'developer',
  } as Employee;

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
      // Adjust the mock return value to match the expected activated employee
      const activatedEmployee = { ...mockEmployee, active: true };
      mockWorkersService.activateEmployee.mockResolvedValueOnce(activatedEmployee);

      const result = await controller.activateEmployee('60d9c6f3f9b5b61710f0f4f4');

      expect(result).toEqual(activatedEmployee);
      expect(result.active).toBe(true);
      expect(service.activateEmployee).toHaveBeenCalledWith('60d9c6f3f9b5b61710f0f4f4');
    });

    it('should activate an employee successfully', async () => {
      const activatedEmployee = { ...mockEmployee, active: true };
      mockWorkersService.activateEmployee.mockResolvedValueOnce(activatedEmployee);
    
      const result = await controller.activateEmployee('60d9c6f3f9b5b61710f0f4f4');
    
      expect(result).toEqual(activatedEmployee);
      expect(result.active).toBe(true);
      expect(service.activateEmployee).toHaveBeenCalledWith('60d9c6f3f9b5b61710f0f4f4');
    });
  });
});

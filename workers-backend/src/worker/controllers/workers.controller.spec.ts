import { Test, TestingModule } from '@nestjs/testing';
import { WorkersController } from './workers.controller';
import { WorkersService } from '../services/workers.service';
import { HttpStatus, HttpException } from '@nestjs/common';
import { workerValidationsSchema } from '../validations/worker.validations.schema';
import { Employee } from 'src/schemas/employee.entity';

describe('WorkersController', () => {
  let controller: WorkersController;
  let workersService: WorkersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkersController],
      providers: [
        {
          provide: WorkersService,
          useValue: {
            createEmployee: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<WorkersController>(WorkersController);
    workersService = module.get<WorkersService>(WorkersService);
  });

  it('should create a new employee', async () => {
    const requestBody: workerValidationsSchema = {
      businessId: '123456',
      userId: '123456789012345678901234',
      createdBy: 'John Doe',
      roleId: '123456789012345678901234',
      position: 'developer',
      workerCode: '12345',
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

  it('should handle errors during employee creation', async () => {
    const requestBody: workerValidationsSchema = {
      businessId: '123456',
      userId: '123456789012345678901234',
      createdBy: 'John Doe',
      roleId: '123456789012345678901234',
      position: 'developer',
      workerCode: '12345', // Mocked workerCode value
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

import { Test } from '@nestjs/testing';
import { WorkersController } from '../controllers/workers.controller';
import { WorkersService } from '../services/workers.service';
import { TransformDataStructure } from '../../transformDataStructure/convertData';
import { Employee } from '../../schemas/employee.entity';
import { Request, Response } from 'express';
import { ContextType, ExecutionContext, Type } from '@nestjs/common';
import { of } from 'rxjs';
import { RpcArgumentsHost, WsArgumentsHost } from '@nestjs/common/interfaces';

describe('WorkersController', () => {
  let workersController: WorkersController;
  let workersService: WorkersService;
  let interceptor: TransformDataStructure;
  const errors: any[] = [];
  let req: Partial<Request> = {};
  let res: Partial<Response<any, Record<string, any>>> = {};

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [WorkersController],
      providers: [WorkersService, TransformDataStructure],
    }).compile();

    workersController = moduleRef.get<WorkersController>(WorkersController);
    workersService = moduleRef.get<WorkersService>(WorkersService);
    interceptor = moduleRef.get<TransformDataStructure>(TransformDataStructure);

    req = {
      body: { message: 'Original data' },
      statusCode: 200,
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    describe('findAll', () => {
      it('should return an array of workers', async () => {
        const workersList: Employee[] = [
          new Employee({
            userId: '1',
            createdBy: 'John Doe',
            code: '123',
            updatedBy: 'Admin',
            roleId: '456',
            position: 'Developer',
          }),
          new Employee({
            userId: '2',
            createdBy: 'Alice Smith',
            code: '456',
            updatedBy: 'Manager',
            roleId: '789',
            position: 'Designer',
          }),
        ];

        jest
          .spyOn(workersService, 'findAllByBusinessId')
          .mockResolvedValue(workersList);
        const result = await workersController.findAll('businessId');

        expect(result).toEqual(workersList);
      });
    });

    it('should transform the data structure and send it as a JSON response', async () => {
      const context: ExecutionContext = {
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: () => req as Request,
          getResponse: () => res as Response,
        }),
        getClass: function <T = any>(): Type<T> {
          throw new Error('Function not implemented.');
        },
        getHandler: function (): Function {
          throw new Error('Function not implemented.');
        },
        getArgs: function <T extends any[] = any[]>(): T {
          throw new Error('Function not implemented.');
        },
        getArgByIndex: function <T = any>(index: number): T {
          throw new Error('Function not implemented.');
        },
        switchToRpc: function (): RpcArgumentsHost {
          throw new Error('Function not implemented.');
        },
        switchToWs: function (): WsArgumentsHost {
          throw new Error('Function not implemented.');
        },
        getType: function <TContext extends string = ContextType>(): TContext {
          throw new Error('Function not implemented.');
        },
      };

      const next = {
        handle: jest.fn().mockReturnValue(
          of({
            data: {},
            Status: 200,
          }),
        ),
      };

      interceptor.intercept(context, next).subscribe({
        next: (data) => {
          try {
            expect(res).toHaveProperty('status');
            expect(res).toHaveProperty('json');
          } catch (err) {
            errors.push(err);
          }
        },
      });
    });
  });
});

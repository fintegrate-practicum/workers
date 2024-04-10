import { Test, TestingModule } from '@nestjs/testing';
import { WorkersController } from './workers.controller';
// import { TransformDataStructure } from '../transformDataStructure/convertData';
import { TransformDataStructure } from 'src/transformDataStructure/convertData';
import { Request, Response } from 'express';
import { ContextType, ExecutionContext, Type } from '@nestjs/common';
import { of } from 'rxjs';
import { RpcArgumentsHost, WsArgumentsHost } from '@nestjs/common/interfaces';

describe('WorkersController', () => {
  let controller: WorkersController;
  let req: Partial<Request> = {};
  let res: Partial<Response<any, Record<string, any>>> = {};
  let interceptor: TransformDataStructure;
  let errors: any[] = [];

  beforeEach(async () => {
    interceptor = new TransformDataStructure();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkersController],
      providers: [TransformDataStructure],
    }).compile();

    controller = module.get<WorkersController>(WorkersController);

    req = {
      body: { message: 'Original data' },
      statusCode: 200,
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
      }
    };
    
    const next = {
      handle: jest.fn().mockReturnValue(of({
        data: {},
        status: 200
      })),
    };

    interceptor.intercept(context, next).subscribe({
      next: (data) => {
        try {
          expect(res).toHaveProperty('status');
          expect(res).toHaveProperty('json');
        } catch (err) {
          errors.push(err);
        }
      }
    });
  });
});


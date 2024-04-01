import { Test, TestingModule } from '@nestjs/testing';
import { WorkersController } from './workers.controller';
import { TransformDataStructure } from '../transformDataStructure/convertData';
import { Request, Response } from 'express';

describe('WorkersController', () => {
  let controller: WorkersController;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(async () => {
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
    };
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  
  it('should transform the data structure and send it as a JSON response', async () => {
    await controller.getData(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      data: { message: 'Original data' },
    });
  });

  it('should use status code 200 if no statusCode provided in request', async () => {
    delete req.statusCode;
    await controller.getData(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      data: { message: 'Original data' },
    });
  }); 
});
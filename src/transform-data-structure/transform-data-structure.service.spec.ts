import { Test, TestingModule } from '@nestjs/testing';
import { TransformDataStructureService } from './transform-data-structure.service';

describe('TransformDataStructureService', () => {
  let service: TransformDataStructureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransformDataStructureService],
    }).compile();

    service = module.get<TransformDataStructureService>(TransformDataStructureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

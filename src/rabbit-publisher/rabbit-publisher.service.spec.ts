import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { RabbitPublisherService } from './rabbit-publisher.service';

describe('RabbitPublisherService', () => {
  let service: RabbitPublisherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RabbitPublisherService,
        ConfigService, // הוספת ConfigService לספקים
      ],
    }).compile();

    service = module.get<RabbitPublisherService>(RabbitPublisherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

it('always returns true', () => {
  expect(true).toBe(true);
});

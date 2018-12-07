import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from './logger.service';
import { ConfigModule } from '../config/config.module';
import { loggerProviders } from './logger.providers';

describe('LoggerService', () => {
  let service: LoggerService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggerService, ...loggerProviders],
      imports: [ConfigModule],
    }).compile();
    service = module.get<LoggerService>(LoggerService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { RegisterCountService } from './register-count.service';

describe('RegisterCountService', () => {
  let service: RegisterCountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegisterCountService],
    }).compile();

    service = module.get<RegisterCountService>(RegisterCountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

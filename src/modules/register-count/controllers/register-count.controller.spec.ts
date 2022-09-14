import { Test, TestingModule } from '@nestjs/testing';
import { RegisterCountController } from './register-count.controller';

describe('RegisterCountController', () => {
  let controller: RegisterCountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterCountController],
    }).compile();

    controller = module.get<RegisterCountController>(RegisterCountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { StockyardController } from './stockyard.controller';

describe('StockyardController', () => {
  let controller: StockyardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockyardController],
    }).compile();

    controller = module.get<StockyardController>(StockyardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { StockyardService } from './stockyard.service';

describe('StockyardService', () => {
  let service: StockyardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockyardService],
    }).compile();

    service = module.get<StockyardService>(StockyardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

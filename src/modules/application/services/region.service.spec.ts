import { Test, TestingModule } from '@nestjs/testing';
import { RegionService } from './region.service';

describe('RegionService', () => {
  let service: RegionService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegionService],
    }).compile();
    service = module.get<RegionService>(RegionService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

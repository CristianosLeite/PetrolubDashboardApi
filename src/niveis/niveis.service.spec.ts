import { Test, TestingModule } from '@nestjs/testing';
import { NiveisService } from './niveis.service';

describe('NiveisService', () => {
  let service: NiveisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NiveisService],
    }).compile();

    service = module.get<NiveisService>(NiveisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

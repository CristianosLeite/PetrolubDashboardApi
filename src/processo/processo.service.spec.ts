import { Test, TestingModule } from '@nestjs/testing';
import { ProcessoService } from './processo.service';

describe('ProcessoService', () => {
  let service: ProcessoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProcessoService],
    }).compile();

    service = module.get<ProcessoService>(ProcessoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ProcessoController } from './processo.controller';
import { ProcessoService } from './processo.service';

describe('ProcessoController', () => {
  let controller: ProcessoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcessoController],
      providers: [ProcessoService],
    }).compile();

    controller = module.get<ProcessoController>(ProcessoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

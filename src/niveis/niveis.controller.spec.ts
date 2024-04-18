import { Test, TestingModule } from '@nestjs/testing';
import { NiveisController } from './niveis.controller';
import { NiveisService } from './niveis.service';

describe('NiveisController', () => {
  let controller: NiveisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NiveisController],
      providers: [NiveisService],
    }).compile();

    controller = module.get<NiveisController>(NiveisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

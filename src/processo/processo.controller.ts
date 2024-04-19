import { Controller, Get, Param } from '@nestjs/common';
import { ProcessoService } from './processo.service';

@Controller('processo')
export class ProcessoController {
  constructor(private readonly processoService: ProcessoService) {}

  @Get('/all')
  findAll() {
    return this.processoService.findAll();
  }

  @Get('/one/:id')
  findOne(@Param('id') id: string) {
    return this.processoService.findOne(+id);
  }

  @Get('/last')
  findLast() {
    return this.processoService.findLast();
  }
}
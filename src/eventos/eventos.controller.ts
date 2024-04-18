import { Controller, Get, Param } from '@nestjs/common';
import { EventosService } from './eventos.service';

@Controller('evento')
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  @Get('/all')
  findAll() {
    return this.eventosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventosService.findOne(+id);
  }
}

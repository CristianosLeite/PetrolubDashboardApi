import { Controller, Get, Param } from '@nestjs/common';
import { NiveisService } from './niveis.service';

@Controller('nivel')
export class NiveisController {
  constructor(private readonly niveisService: NiveisService) {}

  @Get('/all')
  findAll() {
    return this.niveisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.niveisService.findOne(+id);
  }
}

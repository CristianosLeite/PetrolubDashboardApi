import { Controller, Get, Param } from '@nestjs/common';
import { NiveisService } from './niveis.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('bearer'))
@Controller('nivel')
export class NiveisController {
  constructor(private readonly niveisService: NiveisService) {}

  @Get('/all')
  findAll() {
    return this.niveisService.findAll();
  }

  @Get('/one/:id')
  findOne(@Param('id') id: string) {
    return this.niveisService.findOne(+id);
  }

  @Get('/last')
  getLastNivel() {
    return this.niveisService.getLastNivel();
  }
}

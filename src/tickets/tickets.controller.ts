import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Ticket } from 'src/entities/tickets.entity';

@UseGuards(AuthGuard('bearer'))
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post('/create')
  create(@Body() ticket: Ticket): Promise<Ticket> {
    return this.ticketsService.create(ticket);
  }

  @Get('/all')
  findAll() {
    return this.ticketsService.findAll();
  }

  @Get('/one/:id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(+id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() ticket: Ticket) {
    return this.ticketsService.update(+id, ticket);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(+id);
  }
}

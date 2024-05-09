import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from 'src/entities/tickets.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  public async create(ticket: Partial<Ticket>): Promise<Ticket> {
    if (!ticket.created_at) {
      ticket.created_at = new Date().toISOString();
    }

    if (!ticket.updated_at) {
      ticket.updated_at = new Date().toISOString();
    }

    return await this.ticketRepository.save(ticket);
  }

  public async findAll(): Promise<Ticket[]> {
    return await this.ticketRepository.find();
  }

  public async findOne(id: number): Promise<Ticket> {
    return await this.ticketRepository.findOne({
      where: { id },
    });
  }

  public async update(id: number, ticket: Partial<Ticket>): Promise<Ticket> {
    await this.ticketRepository.update({ id }, ticket);
    return this.findOne(id);
  }

  public async remove(id: number): Promise<Ticket> {
    const ticket = await this.findOne(id);
    await this.ticketRepository.delete({ id });
    return ticket;
  }
}

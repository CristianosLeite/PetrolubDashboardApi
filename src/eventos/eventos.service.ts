import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evento } from 'src/entities/eventos.entity';

@Injectable()
export class EventosService {
  constructor(
    @InjectRepository(Evento)
    private readonly eventoRepository: Repository<Evento>,
  ) {}

  public async findAll(): Promise<Evento[]> {
    return this.eventoRepository.find();
  }

  public async findOne(id: number): Promise<Evento> {
    return await this.eventoRepository.findOne({
      where: { evento_id: id },
    });
  }
}

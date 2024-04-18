import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Processo } from 'src/entities/processos.entity';

@Injectable()
export class ProcessoService {
  constructor(
    @InjectRepository(Processo)
    private readonly processoRepository: Repository<Processo>,
  ) {}

  public async findAll(): Promise<Processo[]> {
    return await this.processoRepository.find();
  }

  public async findOne(id: number): Promise<Processo> {
    return await this.processoRepository.findOne({
      where: { processo_id: id },
    });
  }
}

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
    return await this.processoRepository.find({
      order: { processo_id: 'ASC' },
    });
  }

  public async findOne(id: number): Promise<Processo> {
    return await this.processoRepository.findOne({
      where: { processo_id: id },
    });
  }

  public async findLast(): Promise<Processo[]> {
    return await this.processoRepository.find({
      order: { processo_id: 'DESC' },
      take: 1,
    });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nivel } from 'src/entities/niveis.entity';

@Injectable()
export class NiveisService {
  constructor(
    @InjectRepository(Nivel)
    private readonly nivelRepository: Repository<Nivel>,
  ) {}

  public async findAll(): Promise<Nivel[]> {
    return this.nivelRepository.find();
  }

  public async findOne(id: number): Promise<Nivel> {
    return await this.nivelRepository.findOne({
      where: { nivel_id: id },
    });
  }
}

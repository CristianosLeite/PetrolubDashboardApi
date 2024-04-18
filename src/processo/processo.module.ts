import { Module } from '@nestjs/common';
import { ProcessoService } from './processo.service';
import { ProcessoController } from './processo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Processo } from '../entities/processos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Processo])],
  controllers: [ProcessoController],
  providers: [ProcessoService],
})
export class ProcessoModule {}

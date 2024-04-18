import { Module } from '@nestjs/common';
import { NiveisService } from './niveis.service';
import { NiveisController } from './niveis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nivel } from '../entities/niveis.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nivel])],
  controllers: [NiveisController],
  providers: [NiveisService],
})
export class NiveisModule {}

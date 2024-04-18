import { AuthController, LogoutController } from './auth/auth.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './entities/users.entity';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UserModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { Processo } from './entities/processos.entity';
import { Evento } from './entities/eventos.entity';
import { Nivel } from './entities/niveis.entity';
import { ProcessoModule } from './processo/processo.module';
import { EventosModule } from './eventos/eventos.module';
import { NiveisModule } from './niveis/niveis.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    TypeOrmModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      schema: process.env.DATABASE_SCHEMA,
      autoLoadEntities: true,
      synchronize: true,
      ssl: true,
      extra: { ssl: { rejectUnauthorized: false } },
      url: process.env.DATABASE_URL,
      useUTC: true,
    }),
    TypeOrmModule.forFeature([User, Processo, Evento, Nivel]),
    AuthModule,
    UserModule,
    ProcessoModule,
    EventosModule,
    NiveisModule,
  ],
  controllers: [UsersController, AuthController, LogoutController],
  providers: [UsersService, AuthService, JwtService],
})
export class AppModule {}

import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async create(user: User): Promise<User> {
    await this.setUniqueCodUser(user);

    const createdUser = await this.saveUser(user);
    return createdUser;
  }

  private async saveUser(user: User): Promise<User> {
    return await this.userRepository.save(user, { reload: true });
  }

  private async setUniqueCodUser(user: User): Promise<void> {
    if (!user.cod_user) {
      let cod_user = await this.calculateCodUser();
      const existingUser = await this.userRepository.findOne({
        where: { cod_user: cod_user },
      });

      if (!existingUser) {
        user.cod_user = cod_user;
      } else {
        cod_user = await this.calculateCodUser();
        user.cod_user = cod_user;
      }
    }

    user.cod_user = await this.encryptCodUser(user.cod_user);
  }

  public async findOne(userId: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { user_id: userId, situation: 'Activated' },
    });
  }

  public async update(user: User, userId?: string): Promise<User> {
    if (!user) {
      throw new Error('Nenhuma informação para atualizar');
    }
    if (!userId) {
      userId = user.user_id;
    }

    const existingUser = await this.userRepository.findOne({
      where: { user_id: userId, situation: 'Activated' },
    });
    if (!existingUser) {
      throw new Error('Registro não encontrado');
    }

    return this.userRepository.save({
      ...existingUser,
      ...user,
    });
  }

  public async updatePassword(
    companyId: string,
    userId: string,
    role: string,
    password: string,
  ): Promise<User> {
    if (!role) {
      throw new UnauthorizedException('Acesso negado');
    }
    if (!password) {
      throw new Error('Nenhuma informação para atualizar');
    }
    if (!companyId || !userId) {
      throw new Error('Parâmetros incorretos');
    }
    const existingUser = await this.userRepository.findOne({
      where: { user_id: userId, situation: 'Activated' },
    });
    if (!existingUser) {
      throw new Error('Registro não encontrado');
    }
    return this.userRepository.save({
      ...existingUser,
      cod_user: await this.encryptCodUser(password),
    });
  }

  public async delete(userId: string): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { user_id: userId },
    });
    if (!existingUser) {
      throw new NotFoundException('Registro não encontrado');
    }
    return await this.userRepository.remove(existingUser);
  }

  public async findUser(email: string, cod_user: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    const isUser = await this.decryptCodUser(cod_user, user.cod_user);
    if (!isUser) {
      throw new Error('Usuário não encontrado');
    }
    return user;
  }

  private async calculateCodUser(): Promise<string> {
    const cod_user =
      Math.floor(Math.random()) + Math.floor(Math.random() * 500000);
    return await this.encryptCodUser(cod_user.toString());
  }

  private async encryptCodUser(cod_user: string): Promise<string> {
    try {
      const saltRounds = 8;
      const key = process.env.CRYPTO_KEY;

      const encryptedCodUser = await bcrypt.hash(cod_user + key, saltRounds);

      return encryptedCodUser;
    } catch (error) {
      throw error;
    }
  }

  private async decryptCodUser(
    cod_user: string,
    hash: string,
  ): Promise<boolean> {
    try {
      const key = process.env.CRYPTO_KEY;
      const decryptedCodUser = await bcrypt.compare(cod_user + key, hash);

      return decryptedCodUser;
    } catch (error) {
      throw error;
    }
  }

  public async deactivateUser(
    company_id: string,
    user_id: string,
    role: string,
    user: User,
  ): Promise<User> {
    if (role !== 'admin' && role !== 'manager') {
      throw new UnauthorizedException('Acesso negado');
    }
    if (!company_id || !user_id) {
      throw new Error('Parâmetros incorretos');
    }
    if (!user) {
      throw new Error('Nenhuma informação para atualizar');
    }
    return this.userRepository.save({
      ...user,
      situation: 'Deactivated',
    });
  }
}

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

    if (!user) {
      throw new Error('Dados não informados');
    }

    if (!user.created_at) {
      user.created_at = new Date().toISOString();
    }

    const createdUser = await this.saveUser(user);
    return createdUser;
  }

  private async saveUser(user: User): Promise<User> {
    return await this.userRepository.save(user, { reload: true });
  }

  private async setUniqueCodUser(user: User): Promise<void> {
    if (!user.usercode) {
      let cod_user = await this.calculateCodUser();
      const existingUser = await this.userRepository.findOne({
        where: { usercode: cod_user },
      });

      if (!existingUser) {
        user.usercode = cod_user;
      } else {
        cod_user = await this.calculateCodUser();
        user.usercode = cod_user;
      }
    }

    user.usercode = await this.encryptCodUser(user.usercode);
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
      throw new NotFoundException('Registro não encontrado');
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
      usercode: await this.encryptCodUser(password),
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

  public async findUser(userName: string, userCode: string): Promise<User> {
    let user = await this.userRepository.findOne({
      where: { username: userName },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const isUser = await this.decryptCodUser(userCode, user.usercode);

    if (!isUser) {
      user = await this.userRepository.findOne({
        where: { usercode: userCode },
      });
    }

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  private async calculateCodUser(): Promise<string> {
    const usercode =
      Math.floor(Math.random()) + Math.floor(Math.random() * 500000);
    return await this.encryptCodUser(usercode.toString());
  }

  private async encryptCodUser(usercode: string): Promise<string> {
    try {
      const saltRounds = 8;
      const key = process.env.CRYPTO_KEY;

      const encryptedCodUser = await bcrypt.hash(usercode + key, saltRounds);

      return encryptedCodUser;
    } catch (error) {
      throw error;
    }
  }

  private async decryptCodUser(
    usercode: string,
    hash: string,
  ): Promise<boolean> {
    try {
      const key = process.env.CRYPTO_KEY;
      const decryptedCodUser = await bcrypt.compare(usercode + key, hash);

      return decryptedCodUser;
    } catch (error) {
      throw error;
    }
  }

  public async deactivateUser(
    username: string,
    user_id: string,
    role: string,
    user: User,
  ): Promise<User> {
    if (role !== 'admin' && role !== 'manager') {
      throw new UnauthorizedException('Acesso negado');
    }
    if (!username || !user_id) {
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

  public async initializeDefaultUser(): Promise<void> {
    const userCount = await this.userRepository.count();
    if (userCount === 0) {
      const defaultUser = new User({
        username: process.env['USERNAME'],
        usercode: process.env['USERCODE'],
        first_name: process.env['FIRST_NAME'],
        last_name: process.env['LAST_NAME'],
        register_number: process.env['REGISTER_NUMBER'],
        email: process.env['EMAIL'],
        role: 'user',
        created_at: new Date().toISOString(),
        situation: 'Activated',
      });
      await this.create(defaultUser);
    }
  }
}

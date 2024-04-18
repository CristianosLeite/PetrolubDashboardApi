import {
  Injectable,
  Inject,
  forwardRef,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../entities/users.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => JwtService))
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async validateToken(token: string): Promise<User> {
    const payload = await this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    const user = await this.validateUser(
      payload.user.company_id,
      payload.user.user_id,
    );
    if (user) {
      return user;
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async findUser(email: string, cod_user: string): Promise<User> {
    const user = await this.usersService.findUser(email, cod_user);
    if (user) {
      return user;
    } else {
      throw new Error('User not found');
    }
  }

  async validateUser(email: string, user_id: string): Promise<User> {
    const user = await this.usersService.findUser(email, user_id);
    if (user) {
      const credentials = {
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
      };
      return credentials as unknown as User;
    }
  }

  async createToken(user: User, time?: string): Promise<string> {
    const payload = { user };
    if (time) {
      return this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: time,
      });
    }
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
  }

  async decodeToken(token: string): Promise<any> {
    const payload = this.jwtService.decode(token);
    return payload as unknown;
  }
}

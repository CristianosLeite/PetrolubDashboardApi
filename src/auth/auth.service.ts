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
  ) {
    this.usersService.initializeDefaultUser();
  }

  async validateToken(token: string): Promise<User> {
    const payload = await this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    const user = await this.validateUser(
      payload.user.username,
      payload.user.usercode,
    );
    if (user) {
      return user;
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async findUser(username: string, usercode: string): Promise<User> {
    const user = await this.usersService.findUser(username, usercode);
    if (user) {
      return user;
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async validateUser(username: string, usercode: string): Promise<User> {
    const user = await this.usersService.findUser(username, usercode);
    if (user) {
      const credentials = {
        username: user.username,
        usercode: user.usercode,
        first_name: user.first_name,
        last_name: user.last_name,
      };
      return credentials as unknown as User;
    }
  }

  async createToken(user: Partial<User>, time?: string): Promise<string> {
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

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { AuthService } from './auth.service';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(
    token: string,
    done: (error: Error | null, user?: any, info?: any) => void,
  ) {
    try {
      const validatedToken = await this.authService.validateToken(token);
      if (!validatedToken) {
        return done(new UnauthorizedException(), false);
      }
      done(null, token);
    } catch (error) {
      done(error as Error, false);
    }
  }
}

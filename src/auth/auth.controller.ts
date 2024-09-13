import {
  Controller,
  Post,
  UnauthorizedException,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { User } from '../entities/users.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async getToken(@Req() req: Request, @Res() res: Response): Promise<void> {
    const { username, usercode } = req.body;

    if (!username || !usercode) {
      throw new UnauthorizedException('Usuário ou senha não informados');
    }

    const user = await this.authService.findUser(username, usercode);

    if (!user) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    const token = await this.authService.createToken({
      user_id: user.user_id,
      username: username,
      role: user.role,
    } as User);

    res
      .setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL)
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .json({
        message: 'Usuário autenticado',
        status: 200,
        data: {
          user_id: user.user_id,
          username: usercode,
          role: user.role,
        },
      });
  }

  @Post('validate-token')
  async validateToken(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const { token } = req.cookies;
    if (!token) {
      throw new UnauthorizedException('Token não informado');
    }

    const user = await this.authService.validateToken(token);
    if (!user) {
      throw new UnauthorizedException('Token inválido');
    }

    res
      .setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL)
      .json({
        message: 'Token válido',
        data: {
          user_id: user.user_id,
          username: user.username,
          role: user.role,
        },
        token,
      });
  }

  @Post('logout')
  async logout(@Res() res: Response): Promise<void> {
    res
      .setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL)
      .clearCookie('token')
      .json({
        message: 'Usuário deslogado',
        status: 200,
      });
  }
}

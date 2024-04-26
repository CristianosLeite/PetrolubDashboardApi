import {
  Controller,
  Post,
  Get,
  Query,
  UnauthorizedException,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async getToken(
    @Query('username') username: string,
    @Query('usercode') usercode: string,
    @Query('app') app: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      if (!username || !usercode) {
        throw new UnauthorizedException('Usuário ou senha não informado');
      } else {
        const user = await this.authService.findUser(username, usercode);

        const token = await this.authService.createToken(user);

        res
          .setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL)
          .cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24 * 1,
          })
          .redirect(`${process.env.FRONTEND_URL}/${app}`);
      }
    } catch (err: any) {
      res.redirect(
        `${process.env.FRONTEND_URL}/#/not-found?Error=${err.response.error}&Code=${err.response.statusCode}&Message=${err.response.message}`,
      );
      throw new UnauthorizedException(err.message);
    }
  }

  @Post('validate-token')
  async validateToken(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const token = req.cookies['token'];
    if (!token) {
      throw new UnauthorizedException('Token não informado');
    } else {
      const user = await this.authService.validateToken(token);
      if (!user) {
        throw new UnauthorizedException('Token inválido');
      }
      res
        .setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL)
        .json({
          message: 'Token válido',
          token: token,
          data: {
            name: user.first_name + ' ' + user.last_name,
          },
        });
    }
  }
}

@Controller('logout')
export class LogoutController {
  @Get()
  async logout(@Res() res: Response): Promise<void> {
    res
      .setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL)
      .clearCookie('token')
      .redirect(`${process.env.FRONTEND_URL}/`);
  }
}

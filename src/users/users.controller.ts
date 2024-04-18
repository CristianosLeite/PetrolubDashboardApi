import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../entities/users.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';

@UseGuards(AuthGuard('bearer'))
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/create')
  async create(@Body() user: User): Promise<object> {
    return this.userService.create(user);
  }

  @Get('/user')
  async findOne(@Req() req: Request): Promise<User> {
    const token = req.cookies['token'];
    const decodedToken = await this.authService.decodeToken(token);
    return this.userService.findOne(decodedToken.user.user_id);
  }

  @Get('/update')
  @Put('/update/:companyId/:userId')
  async update(@Param() params: User, @Body() user: User): Promise<User> {
    return this.userService.update(user, params.user_id);
  }

  @Put('/update-password/:token')
  async updatePassword(@Body() user: User, @Param() param): Promise<User> {
    const token = param.token;
    await this.authService.validateToken(token);
    const decodedToken = await this.authService.decodeToken(token);
    return this.userService.updatePassword(
      decodedToken.user.company_id,
      decodedToken.user.user_id,
      decodedToken.user.role.role_name,
      user.cod_user,
    );
  }

  @Put('/deactivate')
  async deactivate(@Req() req: Request, @Body() user: User): Promise<User> {
    const token = req.cookies['token'];
    const decodedToken = await this.authService.decodeToken(token);
    return this.userService.deactivateUser(
      decodedToken.user.company_id,
      decodedToken.user.user_id,
      decodedToken.user.role.role_name,
      user,
    );
  }

  @Delete(':companyId/:userId')
  async remove(@Param() params: User) {
    return this.userService.delete(params.user_id);
  }
}

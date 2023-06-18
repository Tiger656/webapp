import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
// import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/me')
  @ApiBearerAuth('Token')
  //@UseGuards(AuthGuard('jwt'))  // 1. Убрать пароль, 2. сваггер внедряет токен авто, 3. Сделать через гарды
  async me(@Req() req: Request) {
    const jwt = req.headers['authorization'].replace('Bearer ', '');
    return await this.authService.me(jwt);
  }

  @Post('register')
  async register(@Body() userDto: CreateUserDto) {
    return await this.authService.register(userDto);
  }

  @Post('login')
  async login(@Body() userDto: CreateUserDto) {
    return await this.authService.login(userDto);
  }
}

import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CreateUserDto,
  createUserDtoValidator,
} from 'src/user/dto/create-user.dto';
import { AuthnGuard } from './guards/authn.guard';
import { JwtPayloadFromRequest } from './decorators/jwtpayload-from-request.decorator';
import { AuthzGuard } from './guards/authz.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/me')
  @ApiBearerAuth('Token')
  @UseGuards(AuthnGuard)
  async me(@JwtPayloadFromRequest() jwtPayload) {
    ////Parameter 'jwtPayload' implicitly has an 'any' type, but a better type may be inferred from usage
    return await this.authService.me(jwtPayload);
  }

  @Post('register')
  async register(@Body() userDto: CreateUserDto) {
    createUserDtoValidator.parse(userDto);
    return await this.authService.register(userDto);
  }

  @Post('login')
  async login(@Body() userDto: CreateUserDto) {
    createUserDtoValidator.parse(userDto);
    return await this.authService.login(userDto);
  }
}

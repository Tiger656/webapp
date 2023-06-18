import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { BaseService } from 'src/base/base.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

const SALT = 10;

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(userDto.password, SALT);
    userDto.password = hashedPassword;
    const user = await this.userService.create(userDto);
    user.password = null;
    return user;
  }

  async login(userDto: CreateUserDto) {
    const users = await this.userService.find({ username: userDto.username });

    if (!users) {
      throw new UnauthorizedException('Invalid username');
    }
    const user = users[0];
    const isPasswordValid = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    const payload = { _id: user._id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  me(jwt: any) {
    const json = this.jwtService.decode(jwt, { json: true }) as { _id: string };
    return this.userService.findOne(json._id);
  }
}

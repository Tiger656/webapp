import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService extends BaseService<User, CreateUserDto> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base/base.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository extends BaseRepository<User, CreateUserDto> {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super(userModel);
  }
}

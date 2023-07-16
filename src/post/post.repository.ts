import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/base/base.repository';
import { Post } from './entities/post.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostRepository extends BaseRepository<Post, CreatePostDto> {
  constructor(@InjectModel(Post.name) private readonly postModel: Model<Post>) {
    super(postModel);
  }
}

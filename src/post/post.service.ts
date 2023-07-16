import { Injectable } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { BaseService } from 'src/base/base.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService extends BaseService<Post, CreatePostDto> {
  constructor(private readonly postRepository: PostRepository) {
    super(postRepository);
  }
}

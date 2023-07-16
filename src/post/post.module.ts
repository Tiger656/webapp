import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './entities/post.entity';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANTS } from 'src/auth/constants';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]), //??
    JwtModule.register({
      secret: JWT_CONSTANTS.secret,
    }),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}

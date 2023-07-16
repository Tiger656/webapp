import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
  Post,
} from '@nestjs/common';
import { PostService } from './post.service';
import {
  CreatePostDto,
  uuidValidator,
  createPostDtoVaidator,
} from './dto/create-post.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthnGuard } from 'src/auth/guards/authn.guard';
import { JwtPayloadFromRequest } from 'src/auth/decorators/jwtpayload-from-request.decorator';
import { JwtPayload } from 'src/auth/dto/jwt-payload.dto';
import mongoose, { ObjectId } from 'mongoose';
import { AuthzGuard } from 'src/auth/guards/authz.guard';
import { GuardPermission } from 'src/auth/decorators/roles.decorator';

@ApiTags('Post Controller')
@Controller('post')
@UseGuards(AuthnGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(AuthzGuard)
  @GuardPermission('create-posts')
  create(
    @Body() createPostDto: CreatePostDto,
    @JwtPayloadFromRequest() jwt: JwtPayload,
  ) {
    createPostDtoVaidator.parse(createPostDto);
    createPostDto.authorId = new mongoose.Schema.Types.ObjectId(jwt._id);
    return this.postService.create(createPostDto);
  }

  @Get()
  @UseGuards(AuthzGuard)
  @GuardPermission('read-posts') // info: Just attach metadata to this metod
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthzGuard)
  @GuardPermission('read-posts')
  findOne(@Param('id') id: string) {
    uuidValidator.parse(id);
    return this.postService.findOne(id);
  }

  // @Patch(':id')
  // @UseGuards(AuthzGuard)
  // @GuardPermission('update-posts') // add condition
  // update(@Param('id') id: string, @Body() updatePostDto: CreatePostDto) {
  //   return this.postService.update(id, updatePostDto);
  // }

  @Delete(':id')
  @UseGuards(AuthzGuard)
  @GuardPermission('delete-posts')
  remove(@Param('id') id: string) {
    uuidValidator.parse(id);
    return this.postService.remove(id);
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { CreateBaseDto } from 'src/base/dto/create-base.dto';

export class CreatePostDto extends CreateBaseDto {
  @ApiProperty({
    example: 'This is post text content',
    description: 'poste text content',
  })
  textContent: string;

  @ApiProperty({
    example: 'No example',
    description: 'Author(user) id',
  })
  authorId: ObjectId;

  //authorIdLikes: Array<ObjectId>;
}

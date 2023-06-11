import { ApiProperty } from '@nestjs/swagger';
import { CreateBaseDto } from 'src/base/dto/create-base.dto';

export class CreatePostDto extends CreateBaseDto {
  @ApiProperty({ example: 'Nameeeee', description: 'field description' })
  name: string;
}

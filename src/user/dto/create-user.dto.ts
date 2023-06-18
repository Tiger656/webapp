import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'AlexFeller23',
    description: 'Username of user',
  })
  username: string;

  @ApiProperty({
    example: 'qwerty123',
    description: 'Username of user',
  })
  password: string;
}

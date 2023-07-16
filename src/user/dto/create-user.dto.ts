import { ApiProperty } from '@nestjs/swagger';
import { acl, allowedRoles } from 'src/auth/acl';
import { z } from 'zod';

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

  @ApiProperty({
    // eslint-disable-next-line prettier/prettier
    example: ["admin", "regular_user"],
    description: 'User roles',
    isArray: true,
    type: String,
  })
  roles: string[];
}

export const createUserDtoValidator = z.object({
  username: z.string().min(7).max(50),
  password: z.string().min(8).min(20),
  roles: z.string().refine((roles) => {
    for (const role of roles) {
      if (!allowedRoles[role]) {
        return false;
      }
    }
  }, 'wrong roles have been passed'),
});

export const uuidValidator = z.coerce.string().uuid();

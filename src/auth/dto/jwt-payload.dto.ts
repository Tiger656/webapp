import { Role } from '../acl';

export type JwtPayload = {
  _id: string;
  username: string;
  roles: Role[];
  iat: number;
  exp: number;
};

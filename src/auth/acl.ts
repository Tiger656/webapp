import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { JwtPayload } from './dto/jwt-payload.dto';

export const allowedRoles = ['admin', 'regular_user'] as const;
export type Role = (typeof allowedRoles)[number];

export const allowedPermissions = [
  'create-posts',
  'read-posts',
  'update-posts-only-self',
  'delete-posts-all',
  'delete-posts-only-self',
  'create-users',
  'read-users',
  'update-users',
  'delete-users',
  'find-all-users',
  'find-user',
  'delete-posts',
] as const;
export type Permission = (typeof allowedPermissions)[number];

export type ACLEntry = {
  permission: Permission;
  condition?: (requestor: JwtPayload, entityId: string) => boolean;
};

export const acl: Record<Role, Array<ACLEntry>> = {
  admin: [
    { permission: 'read-posts' },
    { permission: 'create-posts' },
    { permission: 'update-posts-only-self' },
    { permission: 'delete-posts-all' },
    { permission: 'create-users' },
    { permission: 'read-users' },
    { permission: 'update-users' },
    { permission: 'delete-users' },
    { permission: 'find-all-users' },
    { permission: 'find-user' },
  ],
  regular_user: [
    { permission: 'read-posts' },
    { permission: 'create-posts' },
    {
      permission: 'update-posts-only-self',
      condition: (requestor, entityId: string) =>
        requestor._id.toString() === entityId,
    },
    {
      permission: 'delete-posts-only-self',
      condition: (requestor, entityId: string) =>
        requestor._id.toString() === entityId,
    }, // Add user premissions;
  ],
};

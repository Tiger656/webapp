import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RequestWithJwtPayload } from '../request-with-jwtpayload.type';
import { Reflector } from '@nestjs/core';
import { Model } from 'mongoose';
import { JwtPayload } from '../dto/jwt-payload.dto';
import { Permission, Role, acl } from '../acl';
import { Entity } from 'src/base/base.entity';
import { Post } from 'src/post/entities/post.entity';

@Injectable()
export class AuthzGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const permission = this.reflector.get<Permission>(
      'permission',
      context.getHandler(),
    ) as Permission;
    if (!permission) {
      return true;
    }
    const request = context
      .switchToHttp()
      .getRequest() as RequestWithJwtPayload;
    //const userRoles = request.jwtPayload.roles;

    // for (const userRole of userRoles) {
    //   if (roles.includes(userRole)) {
    //     return true;
    //   }
    // }
    //return false

    return this.canI(request.jwtPayload, permission, null);
  }

  canI(requestor: JwtPayload, permission: Permission, entityId: string) {
    for (const role of requestor.roles) {
      const permisisonInRole = acl[role].find(
        (el) => el.permission === permission,
      );
      if (!permisisonInRole) continue;
      if (!permisisonInRole.condition) return true;
      if (permisisonInRole.condition(requestor, entityId)) return true;
    }
    return false;
  }
}

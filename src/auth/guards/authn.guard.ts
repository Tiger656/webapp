import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestWithJwtPayload } from '../request-with-jwtpayload.type';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthnGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Как его дожидаться?
    // boolean | Promise<boolean> | Observable<boolean>
    const request = context.switchToHttp().getRequest();
    const bearerToken = request.headers['authorization'];
    if (!bearerToken) {
      return false;
    }

    const token = bearerToken.split(' ')[1];
    if (!token) {
      return false;
    }

    const jwtPayload = this.jwtService.verify(token);
    if (!jwtPayload) {
      return false;
    }
    //const roles = (await this.userService.findOne(jwtPayload._id)).roles;
    //jwtPayload.roles = roles;
    (request as unknown as RequestWithJwtPayload).jwtPayload = jwtPayload;
    return true;
  }
}

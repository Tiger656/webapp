import { JwtPayload } from './dto/jwt-payload.dto';

export interface RequestWithJwtPayload extends Request {
  jwtPayload: JwtPayload;
}

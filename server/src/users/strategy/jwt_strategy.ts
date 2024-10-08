import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        request => request.headers.authorization,
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  validate(payload: {
    mail: string;
    sub: string;
    role: string;
  }): { mail: string; userId: string; role: string } {
    return { userId: payload.sub, mail: payload.mail, role: payload.role };
  }
}

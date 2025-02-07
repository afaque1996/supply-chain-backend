import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
      ignoreExpiration: false,
      secretOrKey: 'my-secret-key', 
    });
  }

  async validate(payload: any) {
    console.log('✅ JWT Payload:', payload); // Debugging line
    if (!payload) {
      throw new UnauthorizedException('Invalid Token');
    }
    return { id: payload.id, email: payload.email, role: payload.role };
  }
  
}
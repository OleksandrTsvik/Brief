import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import configuration from '../../config/configuration';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'access-token') {
  constructor(private readonly authService: AuthService) {
    const config = configuration();

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwtAccess.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<string> {
    const { id } = payload;

    const admin = await this.authService.existById(id);

    if (!admin) {
      throw new UnauthorizedException();
    }

    return id;
  }
}

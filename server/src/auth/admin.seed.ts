import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import configuration from '../config/configuration';

@Injectable()
export class AdminSeed implements OnApplicationBootstrap {
  constructor(private readonly authService: AuthService) {}

  async onApplicationBootstrap() {
    const config = configuration();
    const { username, password } = config.admin;

    const newAdmin: LoginDto = { username, password };

    const isExist = await this.authService.existByUsername(newAdmin.username);

    if (isExist) {
      return;
    }

    await this.authService.register(newAdmin);
  }
}

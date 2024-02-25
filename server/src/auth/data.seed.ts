import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class DataSeed implements OnApplicationBootstrap {
  constructor(private readonly authService: AuthService) {}

  async onApplicationBootstrap() {
    const newAdmin: LoginDto = {
      username: 'admin',
      password: '123456',
    };

    const isExist = await this.authService.existByUsername(newAdmin.username);

    if (isExist) {
      return;
    }

    await this.authService.register(newAdmin);
  }
}

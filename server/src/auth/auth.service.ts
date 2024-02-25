import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';

import { AdminEntity } from './admin.entity';
import { AuthDto } from './dto/auth.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import configuration from '../config/configuration';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthDto> {
    const { username, password } = loginDto;

    const admin = await this.adminRepository.findOneBy({ username });

    if (!admin) {
      throw new UnauthorizedException('Incorrect username or password');
    }

    const passwordMatches = await compare(password, admin.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Incorrect username or password');
    }

    const accessToken = await this.generateAccessToken(admin);

    return { username: admin.username, accessToken };
  }

  private generateAccessToken(admin: AdminEntity): Promise<string> {
    const config = configuration();

    const payload: JwtPayload = { id: admin.id };

    return this.jwtService.signAsync(payload, {
      secret: config.jwtAccess.secret,
      expiresIn: config.jwtAccess.expiresIn,
    });
  }

  existById(id: string): Promise<boolean> {
    return this.adminRepository.existsBy({ id });
  }

  existByUsername(username: string): Promise<boolean> {
    return this.adminRepository.existsBy({ username });
  }

  async register(loginDto: LoginDto): Promise<void> {
    const { username, password } = loginDto;

    if (await this.existByUsername(username)) {
      throw new BadRequestException('The provided username is not unique');
    }

    const hashedPassword = await hash(password, 10);

    const newAdmin = this.adminRepository.create({
      username,
      password: hashedPassword,
    });

    await this.adminRepository.save(newAdmin);
  }
}

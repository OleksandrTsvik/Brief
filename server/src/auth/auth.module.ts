import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminEntity } from './admin.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DataSeed } from './data.seed';
import { AtStrategy } from './strategies/at.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, DataSeed],
  exports: [AtStrategy],
})
export class AuthModule {}

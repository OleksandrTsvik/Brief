import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnswersBriefModule } from './answers-brief/answers-brief.module';
import { AuthModule } from './auth/auth.module';
import { BriefModule } from './brief/brief.module';
import { CompletedBriefModule } from './completed-brief/completed-brief.module';
import { configValidationSchema } from './config/config.schema';
import configuration from './config/configuration';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => {
        const config = configuration();

        return {
          type: 'postgres',
          host: config.database.host,
          port: config.database.port,
          username: config.database.username,
          password: config.database.password,
          database: config.database.database,
          timezone: 'UTC',
          // entities: [__dirname + '/../**/*.entity.{js,ts}'],
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    AuthModule,
    BriefModule,
    QuestionModule,
    CompletedBriefModule,
    AnswersBriefModule,
  ],
})
export class AppModule {}

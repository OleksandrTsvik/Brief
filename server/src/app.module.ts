import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { BriefModule } from './brief/brief.module';
import { configValidationSchema } from './config/config.schema';
import { QuestionModule } from './question/question.module';
import { CompletedBriefModule } from './completed-brief/completed-brief.module';
import { AnswersBriefModule } from './answers-brief/answers-brief.module';
import configuration from './config/configuration';

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
          type: 'sqlite',
          autoLoadEntities: true,
          synchronize: true,
          database: config.database.sqlite,
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

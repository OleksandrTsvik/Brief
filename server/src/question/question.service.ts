import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SaveQuestionDto } from './dto/save-question.dto';
import { QuestionEntity } from './question.entity';
import { BriefEntity } from '../brief/brief.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
    @InjectRepository(BriefEntity)
    private readonly briefRepository: Repository<BriefEntity>,
  ) {}

  async create(briefId: string, saveQuestionDto: SaveQuestionDto) {
    const brief = await this.briefRepository.findOneBy({ id: briefId });

    if (!brief) {
      throw new NotFoundException(`Бриф з id = '${briefId}' не знайдено`);
    }

    const { position, question, type, answerOptions } = saveQuestionDto;

    const newQuestion = this.questionRepository.create({
      brief,
      position,
      question,
      type,
      answerOptions,
    });

    await this.questionRepository.save(newQuestion);
  }

  async update(id: string, saveQuestionDto: SaveQuestionDto) {
    const questionById = await this.questionRepository.findOneBy({ id });

    if (!questionById) {
      throw new NotFoundException(`Запитання з id = '${id}' не знайдено`);
    }

    const { position, question, type, answerOptions } = saveQuestionDto;

    await this.questionRepository.update(
      { id },
      { position, question, type, answerOptions },
    );
  }

  async delete(id: string) {
    await this.questionRepository.delete({ id });
  }
}

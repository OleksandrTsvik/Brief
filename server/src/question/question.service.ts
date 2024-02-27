import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { AnswerOptionEntity } from './answer-option.entity';
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
    @InjectRepository(AnswerOptionEntity)
    private readonly answerOptionRepository: Repository<AnswerOptionEntity>,
  ) {}

  findById(id: string) {
    return this.questionRepository.findOne({
      where: { id },
      select: {
        id: true,
        position: true,
        question: true,
        type: true,
        brief: { id: true, title: true, isActive: true },
        answerOptions: { id: true, position: true, answerOption: true },
      },
      relations: { brief: true, answerOptions: true },
    });
  }

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
    const questionById = await this.questionRepository.findOne({
      where: { id },
      relations: { answerOptions: true },
    });

    if (!questionById) {
      throw new NotFoundException(`Запитання з id = '${id}' не знайдено`);
    }

    const { position, question, type, answerOptions } = saveQuestionDto;

    questionById.position = position;
    questionById.question = question;
    questionById.type = type;

    if (questionById.answerOptions.length > 0) {
      await this.answerOptionRepository.delete({
        id: In(questionById.answerOptions.map((answer) => answer.id)),
      });
    }

    questionById.answerOptions = answerOptions.map((answer) =>
      this.answerOptionRepository.create(answer),
    );

    await this.questionRepository.save(questionById);
  }

  async delete(id: string) {
    await this.questionRepository.delete({ id });
  }
}

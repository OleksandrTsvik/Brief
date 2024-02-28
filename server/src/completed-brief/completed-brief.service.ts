import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CompletedBriefEntity } from './completed-brief.entity';
import { CompleteBriefDto } from './dto/complete-brief.dto';
import { UpdateBriefDto } from './dto/update-brief.dto';
import { AnswerEntity } from '../answers-brief/answer.entity';
import { AnswersBriefEntity } from '../answers-brief/answers-brief.entity';
import { BriefEntity } from '../brief/brief.entity';

@Injectable()
export class CompletedBriefService {
  constructor(
    @InjectRepository(CompletedBriefEntity)
    private readonly completedBriefRepository: Repository<CompletedBriefEntity>,
    @InjectRepository(BriefEntity)
    private readonly briefRepository: Repository<BriefEntity>,
    @InjectRepository(AnswersBriefEntity)
    private readonly answersBriefRepository: Repository<AnswersBriefEntity>,
    @InjectRepository(AnswerEntity)
    private readonly answerRepository: Repository<AnswerEntity>,
  ) {}

  findAll() {
    return this.completedBriefRepository.find({
      select: { id: true, dateCompleted: true, brief: { title: true } },
      relations: { brief: true },
      order: { dateCompleted: 'ASC' },
    });
  }

  async completeBrief(briefId: string, completeBriefDto: CompleteBriefDto[]) {
    const brief = await this.briefRepository.findOneBy({ id: briefId });

    if (!brief) {
      throw new NotFoundException(`Бриф з id = '${briefId}' не знайдено`);
    }

    const completedBrief = this.completedBriefRepository.create({
      brief,
      dateCompleted: new Date(),
    });

    await this.completedBriefRepository.save(completedBrief);

    const answersBrief: AnswersBriefEntity[] = [];

    for (const answerBriefDto of completeBriefDto) {
      const answerBrief = this.answersBriefRepository.create({
        completedBrief,
        question: { id: answerBriefDto.questionId },
        answers: this.createAnswers(answerBriefDto.answer),
      });

      answersBrief.push(answerBrief);
    }

    await this.answersBriefRepository.save(answersBrief);
  }

  async update(id: string, updateBriefDto: UpdateBriefDto[]) {
    const completedBrief = await this.completedBriefRepository.findOneBy({
      id,
    });

    if (!completedBrief) {
      throw new NotFoundException(`Завершений бриф з id = '${id}' не знайдено`);
    }

    const answersBrief: AnswersBriefEntity[] = [];

    for (const answerBriefDto of updateBriefDto) {
      const answerBrief = this.answersBriefRepository.create({
        id: answerBriefDto.answerBriefId,
        completedBrief,
        question: { id: answerBriefDto.questionId },
        answers: this.createAnswers(answerBriefDto.answer),
      });

      answersBrief.push(answerBrief);
    }

    await this.answersBriefRepository.save(answersBrief);
  }

  private createAnswers(answer: string | string[]): AnswerEntity[] {
    const answers = Array.isArray(answer) ? answer : [answer];

    return this.answerRepository.create(
      answers.map((item) => ({ answer: item })),
    );
  }
}

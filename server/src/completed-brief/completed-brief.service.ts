import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

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

  findById(id: string) {
    return this.completedBriefRepository.findOne({
      where: { id },
      select: {
        id: true,
        dateCompleted: true,
        brief: { id: true, title: true },
        answersBriefs: {
          id: true,
          answers: { id: true, answer: true },
          question: {
            id: true,
            position: true,
            question: true,
            type: true,
            answerOptions: { id: true, position: true, answerOption: true },
          },
        },
      },
      relations: {
        brief: true,
        answersBriefs: {
          answers: true,
          question: { answerOptions: true },
        },
      },
      order: {
        answersBriefs: {
          question: { position: 'ASC', answerOptions: { position: 'ASC' } },
        },
      },
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
        answers: this.createAnswerEntities(answerBriefDto.answer),
      });

      answersBrief.push(answerBrief);
    }

    await this.answersBriefRepository.save(answersBrief);
  }

  async updateAnswers(id: string, updateBriefDto: UpdateBriefDto[]) {
    const completedBrief = await this.completedBriefRepository.findOne({
      where: { id },
      select: {
        answersBriefs: {
          id: true,
          answers: { id: true, answer: true },
        },
      },
      relations: { answersBriefs: { answers: true } },
    });

    if (!completedBrief) {
      throw new NotFoundException(`Завершений бриф з id = '${id}' не знайдено`);
    }

    const newAnswersBrief: AnswersBriefEntity[] = [];
    const deleteOldAnswerIds: string[] = [];

    for (const answerBriefDto of updateBriefDto) {
      const oldAnswerBrief = completedBrief.answersBriefs.find(
        (item) => item.id === answerBriefDto.answerBriefId,
      );

      if (
        oldAnswerBrief &&
        this.isNewAnswer(oldAnswerBrief.answers, answerBriefDto.answer)
      ) {
        deleteOldAnswerIds.push(
          ...oldAnswerBrief.answers.map((item) => item.id),
        );

        const newAnswerBrief = this.answersBriefRepository.create({
          id: answerBriefDto.answerBriefId,
          answers: this.createAnswerEntities(answerBriefDto.answer),
        });

        newAnswersBrief.push(newAnswerBrief);
      }
    }

    await this.answerRepository.delete({ id: In(deleteOldAnswerIds) });

    await this.answersBriefRepository.save(newAnswersBrief);
  }

  private isNewAnswer(
    oldAnswer: { answer: string }[],
    newAnswer: string | string[],
  ): boolean {
    const oldAnswerArray = oldAnswer.map((item) => item.answer);
    const newAnswerArray = Array.isArray(newAnswer) ? newAnswer : [newAnswer];

    return !(
      oldAnswerArray.length === newAnswerArray.length &&
      oldAnswerArray.every((value) => newAnswerArray.includes(value))
    );
  }

  private createAnswerEntities(answer: string | string[]): AnswerEntity[] {
    const answers = Array.isArray(answer) ? answer : [answer];

    return this.answerRepository.create(
      answers.map((item) => ({ answer: item })),
    );
  }
}

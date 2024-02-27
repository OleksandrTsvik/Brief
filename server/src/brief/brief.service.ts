import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BriefEntity } from './brief.entity';
import { BriefDto } from './dto/brief.dto';

@Injectable()
export class BriefService {
  constructor(
    @InjectRepository(BriefEntity)
    private readonly briefRepository: Repository<BriefEntity>,
  ) {}

  findActive() {
    return this.briefRepository.findOne({
      where: { isActive: true },
      select: {
        id: true,
        title: true,
        questions: {
          id: true,
          position: true,
          question: true,
          type: true,
          answerOptions: { id: true, position: true, answerOption: true },
        },
      },
      relations: { questions: { answerOptions: true } },
      order: {
        questions: { position: 'ASC', answerOptions: { position: 'ASC' } },
      },
    });
  }

  findAll() {
    return this.briefRepository.find({
      select: { id: true, title: true, isActive: true, dateCreation: true },
    });
  }

  findById(id: string) {
    return this.briefRepository.findOne({
      where: { id },
      select: { id: true, title: true, isActive: true, dateCreation: true },
    });
  }

  findByIdWithQuestions(id: string) {
    return this.briefRepository.findOne({
      where: { id },
      select: {
        id: true,
        title: true,
        isActive: true,
        questions: {
          id: true,
          position: true,
          question: true,
          type: true,
          answerOptions: { id: true, position: true, answerOption: true },
        },
      },
      relations: { questions: { answerOptions: true } },
      order: {
        questions: { position: 'ASC', answerOptions: { position: 'ASC' } },
      },
    });
  }

  async create(briefDto: BriefDto) {
    const { title, isActive } = briefDto;

    if (await this.existByTitle(title)) {
      throw new BadRequestException('Вказаний заголовок не є унікальним');
    }

    if (isActive) {
      await this.briefRepository.update(
        { isActive: true },
        { isActive: false },
      );
    }

    const newBrief = this.briefRepository.create({
      title,
      isActive: !!isActive,
      dateCreation: new Date(),
    });

    await this.briefRepository.save(newBrief);
  }

  async update(id: string, briefDto: BriefDto) {
    const briefById = await this.briefRepository.findOneBy({ id });

    if (!briefById) {
      throw new NotFoundException(`Бриф з id = '${id}' не знайдено`);
    }

    const { title, isActive } = briefDto;

    if (briefById.title !== title && (await this.existByTitle(title))) {
      throw new BadRequestException('Вказаний заголовок не є унікальним');
    }

    if (isActive) {
      await this.briefRepository.update(
        { isActive: true },
        { isActive: false },
      );
    }

    await this.briefRepository.update({ id }, { title, isActive: !!isActive });
  }

  async delete(id: string) {
    await this.briefRepository.delete({ id });
  }

  existByTitle(title: string) {
    return this.briefRepository.existsBy({ title });
  }
}

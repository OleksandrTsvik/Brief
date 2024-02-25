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

  async create(briefDto: BriefDto) {
    const { title, isActive } = briefDto;

    if (await this.existByTitle(title)) {
      throw new BadRequestException('The provided title is not unique');
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
      throw new NotFoundException(
        `The brief with the Id = '${id}' was not found`,
      );
    }

    const { title, isActive } = briefDto;

    if (briefById.title !== title && (await this.existByTitle(title))) {
      throw new BadRequestException('The provided title is not unique');
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

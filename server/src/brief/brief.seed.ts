import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { BriefEntity } from './brief.entity';
import { QuestionType } from '../question/enums/question-type.enum';
import { QuestionEntity } from '../question/question.entity';

@Injectable()
export class BriefSeed implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(BriefEntity)
    private readonly briefRepository: Repository<BriefEntity>,
  ) {}

  async onApplicationBootstrap() {
    if (await this.briefRepository.exists()) {
      return;
    }

    const newBrief = this.briefRepository.create({
      title: 'Розробка сайту',
      isActive: true,
      dateCreation: new Date(),
      questions: this.getBriefQuestions(),
    });

    await this.briefRepository.save(newBrief);
  }

  private getBriefQuestions(): DeepPartial<QuestionEntity>[] {
    const questions: DeepPartial<QuestionEntity>[] = [
      { question: "Ваше ім'я", type: QuestionType.Input },
      { question: 'Номер телефону', type: QuestionType.Input },
      {
        question: 'Як з Вами краще контактувати?',
        type: QuestionType.MultipleWithInput,
        answerOptions: [
          { position: 1, answerOption: 'Telegram' },
          { position: 2, answerOption: 'Viber' },
          { position: 3, answerOption: 'По телефону' },
        ],
      },
      { question: 'Зручний період для спілкування', type: QuestionType.Input },
      { question: 'Назва сайту/проєкту', type: QuestionType.Input },
      {
        question: 'Тип сайту',
        type: QuestionType.SingleWithInput,
        answerOptions: [
          { position: 1, answerOption: 'Лендінг (одна сторінка)' },
          {
            position: 2,
            answerOption: 'Інтернет-магазин (кілька сторінок, товари)',
          },
          {
            position: 3,
            answerOption: 'Корпоративний сайт (кілька сторінок, послуги)',
          },
          {
            position: 4,
            answerOption: 'Індивідуальний проєкт (платформи, додатки)',
          },
        ],
      },
      {
        question: 'Які цілі створення Вашого сайту?',
        type: QuestionType.MultipleWithInput,
        answerOptions: [
          { position: 1, answerOption: 'Пошук нових клієнтів' },
          { position: 2, answerOption: 'Реклама товару' },
          { position: 3, answerOption: 'Надання інформації про компанію' },
          {
            position: 4,
            answerOption: 'Просування нового продукту або послуги',
          },
          {
            position: 5,
            answerOption: 'Ребрендинг або редизайн попереднього сайту',
          },
        ],
      },
      {
        question: 'Які завдання вирішує Ваш сайт? (основний функціонал сайту)',
        type: QuestionType.Input,
      },
      {
        question:
          'На яку аудиторію націлений Ваш сайт?\nОпишіть вікові, професійні, географічні, соціальні або інші важливі категорії відвідувачів',
        type: QuestionType.Input,
      },
      {
        question:
          'Яка основна перевага Вашого продукту для потенційного клієнта?',
        type: QuestionType.Input,
      },
      {
        question:
          'Наведіть сайти конкурентів та опишіть, що Вам подобається і не подобається в них?',
        type: QuestionType.Input,
      },
      {
        question: 'Що унікального пропонуєте Ви у порівнянні з конкурентами?',
        type: QuestionType.Input,
      },
      {
        question: 'Мовні версії сайту',
        type: QuestionType.MultipleWithInput,
        answerOptions: [
          { position: 1, answerOption: 'Українська' },
          { position: 2, answerOption: 'Англійська' },
        ],
      },
      {
        question: "Чи потрібна реєстрація домену? (це адресне ім'я сайту)",
        type: QuestionType.Single,
        answerOptions: [
          { position: 1, answerOption: 'Так' },
          { position: 2, answerOption: 'Ні' },
        ],
      },
      {
        question:
          'Чи потрібна реєстрація хостингу? (це сервер, де розміщується сайт)',
        type: QuestionType.Single,
        answerOptions: [
          { position: 1, answerOption: 'Так' },
          { position: 2, answerOption: 'Ні' },
        ],
      },
      {
        question:
          'Наведіть приклади БУДЬ-ЯКИХ сайтів, дизайн яких Вам подобається або не подобається. Чому вони Вам подобаються або не подобаються?',
        type: QuestionType.Input,
      },
      {
        question: 'Слова, що характеризують стилістику Вашого сайту',
        type: QuestionType.MultipleWithInput,
        answerOptions: [
          { position: 1, answerOption: 'Класичний' },
          { position: 2, answerOption: 'Мінімалізм' },
          { position: 3, answerOption: 'Яскравий' },
          { position: 4, answerOption: 'Ретро' },
        ],
      },
      {
        question:
          'Чи є у Вас брендбук, якого треба дотримуватися? (логотип, палітра кольорів, шрифти)',
        type: QuestionType.Input,
      },
      {
        question: 'Очікувані пункти в меню',
        type: QuestionType.Input,
      },
      {
        question: 'Що потрібно розмістити на головній сторінці сайту?',
        type: QuestionType.Input,
      },
      {
        question: 'Чи потрібне наповнення сайту контентом?',
        type: QuestionType.Single,
        answerOptions: [
          { position: 1, answerOption: 'Так' },
          { position: 2, answerOption: 'Ні' },
        ],
      },
      {
        question: 'Чи необхідне просування сайту?',
        type: QuestionType.Multiple,
        answerOptions: [
          { position: 1, answerOption: 'SEO (просування в пошуковій системі)' },
          { position: 2, answerOption: 'SMM (просування в соц мережах)' },
          { position: 3, answerOption: 'Не потрібно' },
        ],
      },
      {
        question: 'У який термін Ви очікуєте отримати готовий сайт?',
        type: QuestionType.Input,
      },
      {
        question:
          'Напишіть, що ще Ви хотіли б додати до інформації, вказаної в цьому брифі',
        type: QuestionType.Input,
      },
    ];

    return questions.map((question, index) => ({
      ...question,
      position: index + 1,
    }));
  }
}

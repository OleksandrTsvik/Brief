import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AnswerEntity } from './answer.entity';
import { CompletedBriefEntity } from '../completed-brief/completed-brief.entity';
import { QuestionEntity } from '../question/question.entity';

@Entity('answers_briefs')
export class AnswersBriefEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => AnswerEntity, (answer) => answer.answerBrief, {
    cascade: ['insert', 'update'],
  })
  answers: AnswerEntity[];

  @ManyToOne(
    () => CompletedBriefEntity,
    (completedBrief) => completedBrief.answersBriefs,
    { cascade: true, onDelete: 'CASCADE' },
  )
  completedBrief: CompletedBriefEntity;

  @ManyToOne(() => QuestionEntity, (question) => question.answersBriefs, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  question: QuestionEntity;
}

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CompletedBriefEntity } from '../completed-brief/completed-brief.entity';
import { QuestionEntity } from '../question/question.entity';

@Entity('answers_briefs')
export class AnswersBriefEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userAnswer: string;

  @ManyToOne(
    () => CompletedBriefEntity,
    (completedBrief) => completedBrief.answersBriefs,
  )
  completedBrief: CompletedBriefEntity;

  @ManyToOne(() => QuestionEntity, (question) => question.answersBriefs)
  question: QuestionEntity;
}

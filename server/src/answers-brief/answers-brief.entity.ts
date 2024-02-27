import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CompletedBriefEntity } from '../completed-brief/completed-brief.entity';
import { QuestionEntity } from '../question/question.entity';

@Entity('answers_briefs')
export class AnswersBriefEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  answer: string;

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

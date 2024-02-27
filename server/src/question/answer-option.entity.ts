import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { QuestionEntity } from './question.entity';

@Entity('answer_options')
export class AnswerOptionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  position: number;

  @Column()
  answerOption: string;

  @ManyToOne(() => QuestionEntity, (question) => question.answerOptions, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  question: QuestionEntity;
}

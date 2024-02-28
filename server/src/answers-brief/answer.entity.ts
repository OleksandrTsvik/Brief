import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AnswersBriefEntity } from './answers-brief.entity';

@Entity('answers')
export class AnswerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  answer: string;

  @ManyToOne(() => AnswersBriefEntity, (answerBrief) => answerBrief.answers, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  answerBrief: AnswersBriefEntity;
}

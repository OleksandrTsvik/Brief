import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AnswerOptionEntity } from './answer-option.entity';
import { AnswersBriefEntity } from '../answers-brief/answers-brief.entity';
import { BriefEntity } from '../brief/brief.entity';

@Entity('questions')
export class QuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  position: number;

  @Column()
  question: string;

  @Column()
  type: string;

  @OneToMany(
    () => AnswerOptionEntity,
    (answerOption) => answerOption.question,
    { cascade: ['insert', 'update'] },
  )
  answerOptions: AnswerOptionEntity[];

  @ManyToOne(() => BriefEntity, (brief) => brief.questions, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  brief: BriefEntity;

  @OneToMany(
    () => AnswersBriefEntity,
    (answersBrief) => answersBrief.question,
    { cascade: ['insert', 'update'] },
  )
  answersBriefs: AnswersBriefEntity[];
}

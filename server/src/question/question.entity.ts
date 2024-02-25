import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column('simple-array', { nullable: true })
  answerOptions: string[] | null;

  @ManyToOne(() => BriefEntity, (brief) => brief.questions)
  brief: BriefEntity;

  @OneToMany(
    () => AnswersBriefEntity,
    (answersBrief) => answersBrief.question,
    { onDelete: 'CASCADE' },
  )
  answersBriefs: AnswersBriefEntity[];
}

import { IsDate } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AnswersBriefEntity } from '../answers-brief/answers-brief.entity';
import { BriefEntity } from '../brief/brief.entity';

@Entity('completed_briefs')
export class CompletedBriefEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('datetime')
  @IsDate()
  dateCompleted: Date;

  @ManyToOne(() => BriefEntity, (brief) => brief.completedBriefs, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  brief: BriefEntity;

  @OneToMany(
    () => AnswersBriefEntity,
    (answersBrief) => answersBrief.completedBrief,
    { cascade: ['insert', 'update'] },
  )
  answersBriefs: AnswersBriefEntity[];
}

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

  @Column('date')
  @IsDate()
  dateCompleted: Date;

  @ManyToOne(() => BriefEntity, (brief) => brief.completedBriefs)
  brief: BriefEntity;

  @OneToMany(
    () => AnswersBriefEntity,
    (answersBrief) => answersBrief.completedBrief,
    { onDelete: 'CASCADE' },
  )
  answersBriefs: AnswersBriefEntity[];
}

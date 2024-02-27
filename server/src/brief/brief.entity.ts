import { IsDate } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CompletedBriefEntity } from '../completed-brief/completed-brief.entity';
import { QuestionEntity } from '../question/question.entity';

@Entity('briefs')
export class BriefEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  title: string;

  @Column({ default: false })
  isActive: boolean;

  @Column('date')
  @IsDate()
  dateCreation: Date;

  @OneToMany(
    () => CompletedBriefEntity,
    (completedBrief) => completedBrief.brief,
    { cascade: ['insert', 'update'] },
  )
  completedBriefs: CompletedBriefEntity[];

  @OneToMany(() => QuestionEntity, (question) => question.brief, {
    cascade: ['insert', 'update'],
  })
  questions: QuestionEntity[];
}

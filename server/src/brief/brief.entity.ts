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
  dateCreation: Date;

  @OneToMany(
    () => CompletedBriefEntity,
    (completedBrief) => completedBrief.brief,
    { onDelete: 'CASCADE' },
  )
  completedBriefs: CompletedBriefEntity[];

  @OneToMany(() => QuestionEntity, (question) => question.brief, {
    onDelete: 'CASCADE',
  })
  questions: QuestionEntity[];
}

import { Question } from './question';

export interface Brief {
  id: string;
  title: string;
  isActive: boolean;
  dateCreation: Date;
}

export interface BriefWithQuestions {
  id: string;
  title: string;
  isActive: boolean;
  questions: Question[];
}

export interface ActiveBrief {
  id: string;
  title: string;
  questions: Question[];
}

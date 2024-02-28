import { Question } from './question';

export interface CompletedBrief {
  id: string;
  dateCompleted: Date;
  brief: { title: string };
}

export interface CompletedBriefWithAnswers {
  id: string;
  dateCompleted: Date;
  brief: { id: string; title: string };
  answersBriefs: {
    id: string;
    answers: { id: string; answer: string }[];
    question: Question;
  }[];
}

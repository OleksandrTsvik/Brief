export enum QuestionType {
  Input = 'INPUT',
  Single = 'SINGLE',
  Multiple = 'MULTIPLE',
}

export interface Question {
  id: string;
  position: number;
  question: string;
  type: QuestionType;
  answerOptions: { id: string; position: number; answerOption: string }[];
}

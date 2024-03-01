export enum QuestionType {
  Input = 'INPUT',
  Single = 'SINGLE',
  Multiple = 'MULTIPLE',
  SingleWithInput = 'SINGLE_WITH_INPUT',
  MultipleWithInput = 'MULTIPLE_WITH_INPUT',
}

export interface Question {
  id: string;
  position: number;
  question: string;
  type: QuestionType;
  answerOptions: { id: string; position: number; answerOption: string }[];
}

export interface QuestionWithBrief extends Question {
  brief: { id: string; title: string; isActive: boolean };
}

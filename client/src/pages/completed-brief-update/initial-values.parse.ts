import { QuestionType } from '../../models/question';

type ReturnType = { [key: string]: string | string[] };

export default function initialValuesParse(
  answersBrief: {
    id: string;
    answers: { answer: string }[];
    question: { type: QuestionType };
  }[],
): ReturnType {
  let result: ReturnType = {};

  for (const answerBrief of answersBrief) {
    let value: string | string[];
    const answers = answerBrief.answers.map((answer) => answer.answer);

    switch (answerBrief.question.type) {
      case QuestionType.Multiple:
      case QuestionType.MultipleWithInput:
        value = answers;
        break;
      default:
        if (answers.length > 0) {
          value = answers[0];
        } else {
          value = '';
        }
    }

    result = {
      ...result,
      [answerBrief.id]: value,
    };
  }

  return result;
}

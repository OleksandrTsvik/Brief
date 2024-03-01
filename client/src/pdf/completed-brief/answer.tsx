import { Text } from '@react-pdf/renderer';

import { styles } from './completed-brief.styles';
import Tab from './tab.pdf';
import { Question, QuestionType } from '../../models/question';

interface Props {
  answers: string[];
  question: Question;
}

export default function Answer({ answers, question }: Props) {
  if (answers.length === 1) {
    return (
      <Text>
        <Text style={styles.textTitleAnswer}>Відповідь:&nbsp;</Text>
        {isOtherAnswer(answers[0], question) ? (
          <Text>(інша)&nbsp;{answers[0]}</Text>
        ) : (
          <Text>{answers[0]}</Text>
        )}
      </Text>
    );
  }

  return (
    <>
      <Text style={styles.textTitleAnswer}>Відповідь:</Text>
      {answers.map((answer, index) => (
        <Text key={index}>
          <Tab />
          {index + 1})&nbsp;
          {isOtherAnswer(answer, question) ? (
            <Text>(інша)&nbsp;{answer}</Text>
          ) : (
            <Text>{answer}</Text>
          )}
        </Text>
      ))}
    </>
  );
}

function isOtherAnswer(answer: string, question: Question): boolean {
  const otherAnswerOptions = question.answerOptions.map(
    (item) => item.answerOption,
  );

  if (otherAnswerOptions.includes(answer)) {
    return false;
  }

  if (question.type === QuestionType.Input) {
    return false;
  }

  return true;
}

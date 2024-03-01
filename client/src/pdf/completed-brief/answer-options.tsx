import { Text } from '@react-pdf/renderer';

import { styles } from './completed-brief.styles';
import Tab from './tab.pdf';
import { Question, QuestionType } from '../../models/question';

interface Props {
  answerIndex: number;
  question: Question;
}

export default function AnswerOptions({ answerIndex, question }: Props) {
  switch (question.type) {
    case QuestionType.Single:
    case QuestionType.Multiple:
    case QuestionType.SingleWithInput:
    case QuestionType.MultipleWithInput:
      return (
        <>
          <Text style={styles.textTitle}>
            Варіанти відповідей&nbsp;
            <Text style={styles.questionType}>({question.type})</Text>:&nbsp;
          </Text>
          {question.answerOptions.map((item, index) => (
            <Text key={item.id}>
              <Tab />
              {answerIndex}.{index + 1})&nbsp;
              {item.answerOption}
            </Text>
          ))}
        </>
      );
    default:
      return null;
  }
}

import { Page, Text, Document, View } from '@react-pdf/renderer';

import Answer from './answer';
import AnswerOptions from './answer-options';
import { styles } from './completed-brief.styles';
import { CompletedBriefWithAnswers } from '../../models/completed-brief';
import formatDate from '../../utils/format-date';

interface Props {
  data: CompletedBriefWithAnswers;
}

export default function CompletedBriefPdf({ data }: Props) {
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.header} fixed>
          ID: {data.id}
        </Text>
        <Text style={styles.titleDate}>{formatDate(data.dateCompleted)}</Text>
        <Text style={styles.title}>{data.brief.title}</Text>
        {data.answersBriefs.map((item, index) => (
          <View key={item.id} style={styles.text}>
            <Text>
              <Text style={styles.index}>{index + 1}.&nbsp;</Text>
              <Text style={styles.textTitle}>Запитання:&nbsp;</Text>
              <Text>{item.question.question}</Text>
            </Text>
            <AnswerOptions answerIndex={index + 1} question={item.question} />
            <Answer
              answers={item.answers.map((answer) => answer.answer)}
              question={item.question}
            />
          </View>
        ))}
        <Text
          style={styles.pageNumber}
          fixed
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
        />
      </Page>
    </Document>
  );
}

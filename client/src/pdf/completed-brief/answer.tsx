import { Text } from '@react-pdf/renderer';

import { styles } from './completed-brief.styles';
import Tab from './tab.pdf';

interface Props {
  answers: string[];
}

export default function Answer({ answers }: Props) {
  if (answers.length === 1) {
    return (
      <Text>
        <Text style={styles.textTitleAnswer}>Відповідь:&nbsp;</Text>
        <Text>{answers[0]}</Text>
      </Text>
    );
  }

  return (
    <>
      <Text style={styles.textTitleAnswer}>Відповідь:</Text>
      {answers.map((answer, index) => (
        <Text key={index}>
          <Tab />
          {index + 1})&nbsp;{answer}
        </Text>
      ))}
    </>
  );
}

import { Badge, List, Tag } from 'antd';

import DeleteQuestionButton from './delete-question.button';
import UpdateQuestionButton from './update-question.button';
import { Question } from '../../models/question';

interface Props {
  index: number;
  item: Question;
}

export default function QuestionListItem({ index, item }: Props) {
  return (
    <List.Item
      actions={[
        <UpdateQuestionButton id={item.id} />,
        <DeleteQuestionButton item={item} />,
      ]}
    >
      <div>
        {index}. {item.question}
      </div>
      <Badge color="green" count={item.answerOptions.length}>
        <Tag>{item.type}</Tag>
      </Badge>
    </List.Item>
  );
}

import { DragOutlined } from '@ant-design/icons';
import { Badge, List, Tag } from 'antd';
import { Draggable } from 'react-beautiful-dnd';

import DeleteQuestionButton from './delete-question.button';
import UpdateQuestionButton from './update-question.button';
import { Question } from '../../models/question';

interface Props {
  index: number;
  item: Question;
}

export default function QuestionListItem({ index, item }: Props) {
  return (
    <Draggable draggableId={`briefQuestions-${index}`} index={index}>
      {(provided) => (
        <List.Item
          ref={provided.innerRef}
          {...provided.draggableProps}
          actions={[
            <UpdateQuestionButton id={item.id} />,
            <DeleteQuestionButton item={item} />,
          ]}
        >
          <div style={{ whiteSpace: 'pre-wrap' }}>
            <DragOutlined
              {...provided.dragHandleProps}
              style={{ cursor: 'grab', fontSize: 18, marginRight: 8 }}
            />
            {index + 1}. {item.question}
          </div>
          <Badge color="green" count={item.answerOptions.length}>
            <Tag>{item.type}</Tag>
          </Badge>
        </List.Item>
      )}
    </Draggable>
  );
}

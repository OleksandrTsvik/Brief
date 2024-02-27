import { DragOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Form, Space, Input } from 'antd';
import { Draggable } from 'react-beautiful-dnd';

import styles from './answer-options.module.css';

interface Props {
  index: number;
  name: number;
  remove: (index: number | number[]) => void;
}

export default function AnswerOptionItem({ index, name, remove }: Props) {
  return (
    <Draggable draggableId={`answerOptionItem-${index}`} index={index}>
      {(provided) => (
        <Space
          className={styles.space}
          align="baseline"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <DragOutlined
            {...provided.dragHandleProps}
            style={{ cursor: 'grab' }}
          />
          <Form.Item
            name={[name, 'answerOption']}
            style={{ margin: 0 }}
            rules={[{ required: true, message: "Обов'язкове поле" }]}
          >
            <Input placeholder="Варіант відповіді" />
          </Form.Item>
          <MinusCircleOutlined
            style={{ color: '#d32029' }}
            onClick={() => remove(name)}
          />
        </Space>
      )}
    </Draggable>
  );
}

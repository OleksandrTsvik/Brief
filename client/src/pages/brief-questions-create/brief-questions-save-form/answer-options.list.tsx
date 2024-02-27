import { PlusOutlined } from '@ant-design/icons';
import { Form, Button } from 'antd';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';

import { AnswerOption } from '.';
import AnswerOptionItem from './answer-option.item';
import styles from './answer-options.module.css';

interface Props {
  getFieldValue: () => AnswerOption[];
  setFieldValue: (value: AnswerOption[]) => void;
}

export default function AnswerOptionsList({
  getFieldValue,
  setFieldValue,
}: Props) {
  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination || destination.index === source.index) {
      return;
    }

    const items = getFieldValue();

    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);

    setFieldValue(items);
  };

  return (
    <Form.List
      name="answerOptions"
      rules={[
        {
          validator: async (_, names) => {
            if (!names || names.length < 2) {
              return Promise.reject(
                new Error('Додайте хоча б 2 варіанти відповідей'),
              );
            }
          },
        },
      ]}
    >
      {(fields, { add, remove }, { errors }) => (
        <>
          <div>Варіанти відповідей:</div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="answerOptions">
              {(provided) => (
                <div
                  className={styles.droppableList}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {fields.map(({ key, name }, index) => (
                    <AnswerOptionItem
                      key={key}
                      index={index}
                      name={name}
                      remove={remove}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <Form.Item>
            <Button
              type="dashed"
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
            >
              Додати варіант відповіді
            </Button>
            <Form.ErrorList errors={errors} />
          </Form.Item>
        </>
      )}
    </Form.List>
  );
}

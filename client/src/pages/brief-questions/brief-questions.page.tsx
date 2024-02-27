import { Breadcrumb, List, Tag, Typography } from 'antd';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { Link, Navigate, useParams } from 'react-router-dom';

import CreateQuestionButton from './create-question.button';
import QuestionListItem from './question-list.item';
import {
  useGetBriefWithQuestionsQuery,
  useReorderQuestionsMutation,
} from '../../api/question.api';
import { CustomSpin } from '../../components';

export default function BriefQuestionsPage() {
  const { id } = useParams();
  const { data, isFetching } = useGetBriefWithQuestionsQuery({
    id: id as string,
  });

  const [reorderQuestions] = useReorderQuestionsMutation();

  if (isFetching) {
    return <CustomSpin />;
  }

  if (!data) {
    return <Navigate to="/not-found" replace />;
  }

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination || destination.index === source.index) {
      return;
    }

    const items = data.questions.map((item) => item.id);

    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);

    reorderQuestions(
      items.map((item, index) => ({ id: item, position: index + 1 })),
    ).unwrap();
  };

  return (
    <>
      <Breadcrumb
        items={[
          { title: <Link to="/admin/briefs">Брифи</Link> },
          {
            title: (
              <>
                Запитання до брифу &#171;{data.title}&#187;&nbsp;&nbsp;
                <Tag color={data.isActive ? 'green' : 'orange'}>
                  {data.isActive ? 'active' : 'no active'}
                </Tag>
              </>
            ),
          },
        ]}
        style={{ marginBottom: 16 }}
      />

      <div style={{ textAlign: 'right' }}>
        <CreateQuestionButton briefId={data.id} />
      </div>

      <Typography.Title level={5}>
        Всього запитань: {data.questions.length}
      </Typography.Title>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="briefQuestions">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <List bordered>
                {data.questions.map((item, index) => (
                  <QuestionListItem key={item.id} index={index} item={item} />
                ))}
                {provided.placeholder}
              </List>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

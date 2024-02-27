import { Breadcrumb, List, Tag, Typography } from 'antd';
import { Link, Navigate, useParams } from 'react-router-dom';

import CreateQuestionButton from './create-question.button';
import QuestionListItem from './question-list.item';
import { useGetBriefWithQuestionsQuery } from '../../api/question.api';
import { CustomSpin } from '../../components';

export default function BriefQuestionsPage() {
  const { id } = useParams();
  const { data, isFetching } = useGetBriefWithQuestionsQuery({
    id: id as string,
  });

  if (isFetching) {
    return <CustomSpin />;
  }

  if (!data) {
    return <Navigate to="/not-found" replace />;
  }

  console.log(data);

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
      <List
        bordered
        dataSource={data.questions}
        renderItem={(item, index) => (
          <QuestionListItem index={index + 1} item={item} />
        )}
      />
    </>
  );
}

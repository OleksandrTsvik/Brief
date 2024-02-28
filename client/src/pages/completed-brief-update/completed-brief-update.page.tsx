import { Breadcrumb, Tag } from 'antd';
import { useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';

import CompletedBriefDownloadPdf from './completed-brief-download.pdf';
import CompletedBriefForm from './completed-brief.form';
import initialValuesParse from './initial-values.parse';
import { useGetCompletedBriefQuery } from '../../api/completed-brief.api';
import { CustomSpin } from '../../components';
import formatDate from '../../utils/format-date';

export default function CompletedBriefUpdatePage() {
  const { id } = useParams();
  const { data, isFetching } = useGetCompletedBriefQuery({ id: id as string });

  const initialValues = useMemo(
    () => (data?.answersBriefs ? initialValuesParse(data.answersBriefs) : {}),
    [data?.answersBriefs],
  );

  if (isFetching) {
    return <CustomSpin />;
  }

  if (!data) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <>
      <Breadcrumb
        items={[
          { title: <Link to="/admin/completed-briefs">Завершені брифи</Link> },
          {
            title: (
              <>
                Редагування завершеного брифу &#171;{data.brief.title}&#187;{' '}
                <Tag>{formatDate(data.dateCompleted)}</Tag>
              </>
            ),
          },
        ]}
        style={{ marginBottom: 16 }}
      />
      <div style={{ textAlign: 'right', marginBottom: 8 }}>
        <CompletedBriefDownloadPdf data={data} />
      </div>
      <CompletedBriefForm
        id={data.id}
        questions={data.answersBriefs.map((item) => ({
          ...item.question,
          id: item.id,
        }))}
        initialValues={initialValues}
      />
    </>
  );
}

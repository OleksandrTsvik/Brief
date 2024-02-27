import { Breadcrumb } from 'antd';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

import {
  useGetQuestionQuery,
  useUpdateQuestionMutation,
} from '../../api/question.api';
import { CustomSpin } from '../../components';
import BriefQuestionsSaveForm, {
  FormFinishValues,
} from '../brief-questions-create/brief-questions-save-form';

export default function BriefQuestionsUpdatePage() {
  const { questionId } = useParams();
  const { data, isFetching } = useGetQuestionQuery({
    id: questionId as string,
  });

  const navigate = useNavigate();

  const [updateQuestion, { isLoading, isError, error }] =
    useUpdateQuestionMutation();

  if (isFetching) {
    return <CustomSpin />;
  }

  if (!data) {
    return <Navigate to="/not-found" replace />;
  }

  const handleSubmit = (body: FormFinishValues) => {
    updateQuestion({ id: data.id, ...body, position: data.position })
      .unwrap()
      .then(() => navigate(`/admin/briefs/questions/${data.brief.id}`));
  };

  return (
    <>
      <Breadcrumb
        items={[
          { title: <Link to="/admin/briefs">Брифи</Link> },
          {
            title: (
              <Link to={`/admin/briefs/questions/${data.brief.id}`}>
                {data.brief.title}
              </Link>
            ),
          },
          {
            title: (
              <>
                Редагування запитання &#171;{data.question.slice(0, 15)}
                {data.question.length > 15 && '...'}&#187;
              </>
            ),
          },
        ]}
        style={{ marginBottom: 16 }}
      />
      <BriefQuestionsSaveForm
        submitText="Оновити"
        initialValues={data}
        isLoading={isLoading}
        isError={isError}
        error={error}
        onSubmit={handleSubmit}
      />
    </>
  );
}

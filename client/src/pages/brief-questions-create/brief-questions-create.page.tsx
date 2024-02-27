import { Breadcrumb } from 'antd';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

import BriefQuestionsSaveForm, {
  FormFinishValues,
} from './brief-questions-save-form';
import { useGetBriefQuery } from '../../api/brief.api';
import { useCreateQuestionMutation } from '../../api/question.api';
import { CustomSpin } from '../../components';
import { QuestionType } from '../../models/question';

export default function BriefQuestionsCreatePage() {
  const { briefId } = useParams();
  const { data, isFetching } = useGetBriefQuery({ id: briefId as string });

  const navigate = useNavigate();

  const [createQuestion, { isLoading, isError, error }] =
    useCreateQuestionMutation();

  if (isFetching) {
    return <CustomSpin />;
  }

  if (!data) {
    return <Navigate to="/not-found" replace />;
  }

  const handleSubmit = (body: FormFinishValues) => {
    createQuestion({ briefId: data.id, ...body })
      .unwrap()
      .then(() => navigate(`/admin/briefs/questions/${data.id}`));
  };

  return (
    <>
      <Breadcrumb
        items={[
          { title: <Link to="/admin/briefs">Брифи</Link> },
          {
            title: (
              <Link to={`/admin/briefs/questions/${data.id}`}>
                {data.title}
              </Link>
            ),
          },
          { title: 'Створення запитання' },
        ]}
        style={{ marginBottom: 16 }}
      />
      <BriefQuestionsSaveForm
        submitText="Створити"
        initialValues={{ type: QuestionType.Input, answerOptions: [] }}
        isLoading={isLoading}
        isError={isError}
        error={error}
        onSubmit={handleSubmit}
      />
    </>
  );
}

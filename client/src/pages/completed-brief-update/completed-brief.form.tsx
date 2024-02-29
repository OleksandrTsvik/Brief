import { App } from 'antd';

import {
  UpdateCompleteBriefRequest,
  useUpdateCompletedBriefMutation,
} from '../../api/completed-brief.api';
import { Question } from '../../models/question';
import BriefSaveForm, { FormValues } from '../brief/brief-save.form';

interface Props {
  id: string;
  questions: Question[];
  initialValues: Partial<FormValues>;
}

export default function CompletedBriefForm({
  id,
  questions,
  initialValues,
}: Props) {
  const { notification } = App.useApp();

  const [updateCompletedBrief, { isLoading, isError, error }] =
    useUpdateCompletedBriefMutation();

  const handleSubmit = (values: FormValues) => {
    const body: UpdateCompleteBriefRequest = {
      id,
      data: Object.keys(values).map((key) => ({
        answerBriefId: key,
        answer: values[key],
      })),
    };

    updateCompletedBrief(body)
      .unwrap()
      .then(() =>
        notification.success({
          message: 'Успіх',
          description: 'Дані успішно оновлено',
        }),
      );
  };

  return (
    <BriefSaveForm
      questions={questions}
      submitText="Оновити дані"
      initialValues={initialValues}
      isLoading={isLoading}
      isError={isError}
      error={error}
      onSubmit={handleSubmit}
    />
  );
}

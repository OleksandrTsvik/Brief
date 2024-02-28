import BriefSaveForm, { FormValues } from './brief-save.form';
import {
  CompleteBriefRequest,
  useCompleteBriefMutation,
} from '../../api/completed-brief.api';
import { Question } from '../../models/question';

interface Props {
  briefId: string;
  questions: Question[];
}

export default function BriefForm({ briefId, questions }: Props) {
  const [completeBrief, { isLoading, isError, error }] =
    useCompleteBriefMutation();

  const handleSubmit = (values: FormValues, resetFields: () => void) => {
    const body: CompleteBriefRequest = {
      briefId,
      data: Object.keys(values).map((key) => ({
        questionId: key,
        answer: values[key],
      })),
    };

    completeBrief(body)
      .unwrap()
      .then(() => resetFields());
  };

  return (
    <BriefSaveForm
      questions={questions}
      submitText="Відправити"
      isLoading={isLoading}
      isError={isError}
      error={error}
      onSubmit={handleSubmit}
    />
  );
}

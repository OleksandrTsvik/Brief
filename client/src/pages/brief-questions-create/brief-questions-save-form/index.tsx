import { Button, Form, Input, Radio, Space } from 'antd';

import AnswerOptionsList from './answer-options.list';
import { ErrorMessage } from '../../../components';
import { QuestionType } from '../../../models/question';

export interface AnswerOption {
  position: number;
  answerOption: string;
}

export interface FormValues {
  question: string;
  type: QuestionType;
  answerOptions: AnswerOption[];
}

interface Props {
  submitText: string;
  initialValues: Partial<FormValues>;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  onSubmit: (values: FormValues) => void;
}

export default function BriefQuestionsSaveForm({
  submitText,
  initialValues,
  isLoading,
  isError,
  error,
  onSubmit,
}: Props) {
  const [form] = Form.useForm<FormValues>();
  const answerType = Form.useWatch('type', form);

  const handleSubmit = (values: FormValues) => {
    const answerOptions: AnswerOption[] = values.answerOptions
      ? values.answerOptions.map((item, index) => ({
          position: index + 1,
          answerOption: item.answerOption,
        }))
      : [];

    const body: FormValues = {
      ...values,
      answerOptions,
    };

    onSubmit(body);
  };

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={initialValues}
      onFinish={handleSubmit}
    >
      {isError && (
        <Form.Item>
          <ErrorMessage error={error} />
        </Form.Item>
      )}

      <Form.Item
        name="question"
        label="Запитання"
        rules={[{ required: true, message: 'Введіть запитання' }]}
      >
        <Input.TextArea autoSize={{ minRows: 1, maxRows: 6 }} />
      </Form.Item>

      <Form.Item
        name="type"
        label="Оберіть варіант відповіді на запитання"
        rules={[{ required: true, message: 'Оберіть один з варіантів' }]}
      >
        <Radio.Group>
          <Space direction="vertical">
            <Radio value={QuestionType.Input}>Текстове поле</Radio>
            <Radio value={QuestionType.Single}>Вибір однієї відповіді</Radio>
            <Radio value={QuestionType.SingleWithInput}>
              Вибір однієї відповіді з можливістю ввести власну
            </Radio>
            <Radio value={QuestionType.Multiple}>
              Вибір декількох відповідей
            </Radio>
            <Radio value={QuestionType.MultipleWithInput}>
              Вибір декількох відповідей з можливістю ввести власну
            </Radio>
          </Space>
        </Radio.Group>
      </Form.Item>

      {(answerType === QuestionType.Single ||
        answerType === QuestionType.Multiple ||
        answerType === QuestionType.SingleWithInput ||
        answerType === QuestionType.MultipleWithInput) && (
        <AnswerOptionsList
          getFieldValue={() => form.getFieldValue('answerOptions')}
          setFieldValue={(value) => form.setFieldValue('answerOptions', value)}
        />
      )}

      <Form.Item>
        <Button block type="primary" htmlType="submit" loading={isLoading}>
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
}

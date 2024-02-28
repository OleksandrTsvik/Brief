import { Button, Checkbox, Form, Input, Radio, Space } from 'antd';

import { ErrorMessage } from '../../components';
import { Question, QuestionType } from '../../models/question';

export interface FormValues {
  [key: string]: string | string[];
}

interface Props {
  questions: Question[];
  submitText: string;
  initialValues?: Partial<FormValues>;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  onSubmit: (values: FormValues, resetFields: () => void) => void;
}

export default function BriefSaveForm({
  questions,
  submitText,
  initialValues,
  isLoading,
  isError,
  error,
  onSubmit,
}: Props) {
  const [form] = Form.useForm<FormValues>();

  const handleSubmit = (values: FormValues) => {
    onSubmit(values, form.resetFields);
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

      {questions.map((question, index) => (
        <Form.Item
          key={question.id}
          name={question.id}
          label={`${index + 1}. ${question.question}`}
          rules={[{ required: true, message: "Обов'язкове поле" }]}
        >
          {question.type === QuestionType.Single && (
            <Radio.Group>
              <Space direction="vertical">
                {question.answerOptions.map((answerOption) => (
                  <Radio
                    key={answerOption.id}
                    value={answerOption.answerOption}
                  >
                    {answerOption.answerOption}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          )}
          {question.type === QuestionType.Multiple && (
            <Checkbox.Group>
              <Space direction="vertical">
                {question.answerOptions.map((answerOption) => (
                  <Checkbox
                    key={answerOption.id}
                    value={answerOption.answerOption}
                  >
                    {answerOption.answerOption}
                  </Checkbox>
                ))}
              </Space>
            </Checkbox.Group>
          )}
          {question.type === QuestionType.Input && <Input />}
        </Form.Item>
      ))}

      <Form.Item>
        <Button block type="primary" htmlType="submit" loading={isLoading}>
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
}

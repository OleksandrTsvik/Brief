import { Button, Checkbox, Form, Input, Radio, Space } from 'antd';

import {
  CompleteBriefRequest,
  useCompleteBriefMutation,
} from '../../api/completed-brief.api';
import { ErrorMessage } from '../../components';
import { Question, QuestionType } from '../../models/question';

interface FormValues {
  [key: string]: string | string[];
}

interface Props {
  briefId: string;
  questions: Question[];
}

export default function BriefForm({ briefId, questions }: Props) {
  const [completeBrief, { isLoading, isError, error }] =
    useCompleteBriefMutation();

  const [form] = Form.useForm<FormValues>();

  const handleSubmit = (values: FormValues) => {
    const body: CompleteBriefRequest = {
      briefId,
      data: Object.keys(values).map((key) => ({
        questionId: key,
        answer: values[key],
      })),
    };

    completeBrief(body)
      .unwrap()
      .then(() => form.resetFields());
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleSubmit}>
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
          Відправити
        </Button>
      </Form.Item>
    </Form>
  );
}

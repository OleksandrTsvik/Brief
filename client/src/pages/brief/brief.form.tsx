import { Button, Checkbox, Form, Input, Radio, Space } from 'antd';

import { Question, QuestionType } from '../../models/question';

interface FormValues {
  [key: string]: string;
}

interface Props {
  questions: Question[];
}

export default function BriefForm({ questions }: Props) {
  const [form] = Form.useForm<FormValues>();

  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleSubmit}>
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
        <Button block type="primary" htmlType="submit">
          Відправити
        </Button>
      </Form.Item>
    </Form>
  );
}

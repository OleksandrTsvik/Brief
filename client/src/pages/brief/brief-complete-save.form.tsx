import { Button, Checkbox, Form, Input, Radio, Space, Typography } from 'antd';

import styles from './brief.module.css';
import getOtherInputInitValue from './get-other-input-init-value';
import { CheckboxInput, ErrorMessage, RadioInput } from '../../components';
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

export default function BriefCompleteSaveForm({
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
    const uniqueValues: FormValues = {};

    for (const key of Object.keys(values)) {
      const value = values[key];

      if (Array.isArray(value)) {
        uniqueValues[key] = value.filter(
          (value, index, array) => value && array.indexOf(value) === index,
        );
      } else {
        uniqueValues[key] = value;
      }
    }

    onSubmit(uniqueValues, form.resetFields);
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
          label={
            <>
              <Typography.Text strong>{index + 1}.&nbsp;</Typography.Text>
              <Typography.Text style={{ whiteSpace: 'pre-wrap' }}>
                {question.question}
              </Typography.Text>
            </>
          }
          rules={[{ required: true, message: "Обов'язкове поле" }]}
          labelCol={{ className: styles.questionLabel }}
        >
          {question.type === QuestionType.Input && (
            <Input.TextArea autoSize={{ minRows: 1, maxRows: 6 }} />
          )}

          {(question.type === QuestionType.Single ||
            question.type === QuestionType.SingleWithInput) && (
            <Radio.Group style={{ width: '100%' }}>
              <Space direction="vertical" style={{ width: '100%' }}>
                {question.answerOptions.map((answerOption) => (
                  <Radio
                    key={answerOption.id}
                    value={answerOption.answerOption}
                  >
                    {answerOption.answerOption}
                  </Radio>
                ))}
                {question.type === QuestionType.SingleWithInput && (
                  <RadioInput
                    initValue={
                      initialValues &&
                      getOtherInputInitValue(
                        initialValues[question.id],
                        question.answerOptions.map((item) => item.answerOption),
                      )
                    }
                    name={question.id}
                    formSetFieldValue={form.setFieldValue}
                  />
                )}
              </Space>
            </Radio.Group>
          )}

          {(question.type === QuestionType.Multiple ||
            question.type === QuestionType.MultipleWithInput) && (
            <Checkbox.Group style={{ width: '100%' }}>
              <Space direction="vertical" style={{ width: '100%' }}>
                {question.answerOptions.map((answerOption) => (
                  <Checkbox
                    key={answerOption.id}
                    value={answerOption.answerOption}
                  >
                    {answerOption.answerOption}
                  </Checkbox>
                ))}
                {question.type === QuestionType.MultipleWithInput && (
                  <CheckboxInput
                    initValue={
                      initialValues &&
                      getOtherInputInitValue(
                        initialValues[question.id],
                        question.answerOptions.map((item) => item.answerOption),
                      )
                    }
                    name={question.id}
                    otherCheckboxValues={question.answerOptions.map(
                      (item) => item.answerOption,
                    )}
                    formSetFieldValue={form.setFieldValue}
                    formGetFieldValue={form.getFieldValue}
                  />
                )}
              </Space>
            </Checkbox.Group>
          )}
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

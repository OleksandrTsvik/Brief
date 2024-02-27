import { Form, Input, Button, Radio } from 'antd';

import { ErrorMessage } from '../../components';

export interface FormValues {
  title: string;
  isActive: boolean;
}

interface Props {
  submitText: string;
  initialValues: Partial<FormValues>;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  onSubmit: (values: FormValues) => void;
}

export default function BriefSaveForm({
  submitText,
  initialValues,
  isLoading,
  isError,
  error,
  onSubmit,
}: Props) {
  const [form] = Form.useForm<FormValues>();

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={initialValues}
      onFinish={onSubmit}
    >
      {isError && (
        <Form.Item>
          <ErrorMessage error={error} />
        </Form.Item>
      )}

      <Form.Item
        name="title"
        label="Заголовок"
        rules={[
          { required: true, message: 'Введіть заголовок брифу' },
          {
            min: 3,
            max: 32,
            message: 'Заголовок має містити від 3-32 символів',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="isActive"
        label="Активний?"
        rules={[{ required: true, message: 'Оберіть один з варіантів' }]}
      >
        <Radio.Group>
          <Radio value={true}>так</Radio>
          <Radio value={false}>ні</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit" loading={isLoading}>
          {submitText}
        </Button>
      </Form.Item>
    </Form>
  );
}

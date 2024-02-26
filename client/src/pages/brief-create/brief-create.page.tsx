import { Form, Typography, Input, Button, Radio } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useCreateBriefMutation } from '../../api/brief.api';
import { ErrorMessage } from '../../components';

interface FormValues {
  title: string;
  isActive: boolean;
}

export default function BriefCreatePage() {
  const navigate = useNavigate();
  const [createBrief, { isLoading, isError, error }] = useCreateBriefMutation();

  const [form] = Form.useForm<FormValues>();

  const handleSubmit = (values: FormValues) => {
    createBrief(values)
      .unwrap()
      .then(() => navigate('/admin/briefs'));
  };

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{ isActive: false }}
      onFinish={handleSubmit}
    >
      <Typography.Title style={{ textAlign: 'center' }}>
        Створення брифу
      </Typography.Title>

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
          Створити
        </Button>
      </Form.Item>
    </Form>
  );
}

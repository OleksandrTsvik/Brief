import { Form, Input, Button, Radio, Breadcrumb } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

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
    <>
      <Breadcrumb
        items={[
          { title: <Link to="/admin/briefs">Брифи</Link> },
          { title: 'Створення брифу' },
        ]}
        style={{ marginBottom: 16 }}
      />
      <Form
        layout="vertical"
        form={form}
        initialValues={{ isActive: false }}
        onFinish={handleSubmit}
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
            Створити
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

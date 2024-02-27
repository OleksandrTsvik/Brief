import { Form, Input, Button, Radio, Breadcrumb } from 'antd';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

import { useGetBriefQuery, useUpdateBriefMutation } from '../../api/brief.api';
import { CustomSpin, ErrorMessage } from '../../components';

interface FormValues {
  title: string;
  isActive: boolean;
}

export default function BriefUpdatePage() {
  const { id } = useParams();
  const { data, isFetching } = useGetBriefQuery({ id: id as string });

  const navigate = useNavigate();
  const [createBrief, { isLoading, isError, error }] = useUpdateBriefMutation();

  const [form] = Form.useForm<FormValues>();

  if (isFetching) {
    return <CustomSpin />;
  }

  if (!data) {
    return <Navigate to="/not-found" replace />;
  }

  const handleSubmit = (values: FormValues) => {
    createBrief({ id: id as string, ...values })
      .unwrap()
      .then(() => navigate('/admin/briefs'));
  };

  return (
    <>
      <Breadcrumb
        items={[
          { title: <Link to="/admin/briefs">Брифи</Link> },
          {
            title: <>Редагування брифу &#171;{data.title}&#187;</>,
          },
        ]}
        style={{ marginBottom: 16 }}
      />
      <Form
        layout="vertical"
        form={form}
        initialValues={data}
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
            Оновити
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

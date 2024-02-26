import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Button, Typography } from 'antd';

import styles from './admin-login.module.css';
import { useLoginMutation } from '../../auth/auth.api';
import { setCredentials } from '../../auth/auth.slice';
import { ErrorMessage } from '../../components';
import { useAppDispatch } from '../../hooks/redux-hooks';

interface FormValues {
  username: string;
  password: string;
}

export default function AdminLoginPage() {
  const appDispatch = useAppDispatch();
  const [login, { isLoading, isError, error }] = useLoginMutation();

  const [form] = Form.useForm<FormValues>();

  const handleSubmit = (values: FormValues) => {
    login(values)
      .unwrap()
      .then((response) => appDispatch(setCredentials(response)));
  };

  return (
    <div className={styles.formWrapper}>
      <Form className={styles.form} form={form} onFinish={handleSubmit}>
        <Typography.Title className={styles.title}>
          Log in to admin panel
        </Typography.Title>

        {isError && (
          <Form.Item>
            <ErrorMessage error={error} />
          </Form.Item>
        )}

        <Form.Item
          name="username"
          rules={[
            { required: true, message: 'Please input your Username!' },
            { min: 2, max: 32 },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Please input your Password!' },
            { min: 6, max: 32 },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button block loading={isLoading} type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

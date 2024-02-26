import { Alert, List } from 'antd';

import getErrorObject from '../../utils/get-error-object';

interface Props {
  error: unknown;
}

export default function ErrorMessage({ error }: Props) {
  const errorObject = getErrorObject(error);

  if (typeof errorObject.description === 'string') {
    return <Alert type="error" message={errorObject.description} />;
  }

  if (Array.isArray(errorObject.description)) {
    return (
      <Alert
        type="error"
        message={
          <List
            size="small"
            dataSource={errorObject.description}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        }
      />
    );
  }

  if (errorObject.message) {
    return <Alert type="error" message={errorObject.message} />;
  }

  return null;
}

import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

interface Props {
  briefId: string;
}

export default function CreateQuestionButton({ briefId }: Props) {
  return (
    <div style={{ display: 'block', textAlign: 'right', marginBottom: 16 }}>
      <Link to={`/admin/briefs/questions/${briefId}/create`}>
        <Button type="primary" icon={<PlusOutlined />}>
          Додати запитання
        </Button>
      </Link>
    </div>
  );
}

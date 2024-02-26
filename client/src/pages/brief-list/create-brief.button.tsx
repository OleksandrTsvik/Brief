import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

export default function CreateBriefButton() {
  return (
    <Link
      to="/admin/briefs/create"
      style={{ display: 'block', textAlign: 'right', marginBottom: 16 }}
    >
      <Button type="primary" icon={<PlusOutlined />}>
        Додати бриф
      </Button>
    </Link>
  );
}

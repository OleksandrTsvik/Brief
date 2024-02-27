import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

interface Props {
  id: string;
}

export default function UpdateBriefButton({ id }: Props) {
  return (
    <Link to={`/admin/briefs/update/${id}`}>
      <Button type="primary" icon={<EditOutlined />} />
    </Link>
  );
}

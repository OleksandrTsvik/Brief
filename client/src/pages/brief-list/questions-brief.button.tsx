import { QuestionOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { Link } from 'react-router-dom';

interface Props {
  id: string;
}

export default function QuestionsBriefButton({ id }: Props) {
  return (
    <Tooltip title="Запитання брифу" color="#642ab5">
      <Link to={`/admin/briefs/questions/${id}`}>
        <Button
          type="primary"
          icon={<QuestionOutlined />}
          style={{ background: '#642ab5' }}
        />
      </Link>
    </Tooltip>
  );
}

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, List, Tag } from 'antd';
import { Link } from 'react-router-dom';

import { Question } from '../../models/question';

interface Props {
  index: number;
  item: Question;
}

export default function QuestionListItem({ index, item }: Props) {
  return (
    <List.Item
      actions={[
        <Link to={`/admin/briefs/questions/update/${item.id}`}>
          <Button type="primary" icon={<EditOutlined />} />
        </Link>,
        <Button danger type="primary" icon={<DeleteOutlined />} />,
      ]}
    >
      <div>
        {index}. {item.question}
      </div>
      <Tag>{item.type}</Tag>
    </List.Item>
  );
}

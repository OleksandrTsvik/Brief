import { EditOutlined } from '@ant-design/icons';
import { Button, List, Tag } from 'antd';
import { Link } from 'react-router-dom';

import DeleteBriefButton from './delete-brief.button';
import ToggleActiveButton from './toggle-active.button';
import { Brief } from '../../models/brief';

interface Props {
  item: Brief;
}

export default function BriefListItem({ item }: Props) {
  return (
    <List.Item
      actions={[
        <ToggleActiveButton item={item} />,
        <Link to={`/admin/briefs/update/${item.id}`}>
          <Button type="primary" icon={<EditOutlined />} />
        </Link>,
        <DeleteBriefButton item={item} />,
      ]}
    >
      <div>
        {item.isActive && <Tag color="green">active</Tag>}
        {item.title}
      </div>
    </List.Item>
  );
}

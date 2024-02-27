import { List, Tag } from 'antd';

import DeleteBriefButton from './delete-brief.button';
import QuestionsBriefButton from './questions-brief.button';
import ToggleActiveButton from './toggle-active.button';
import UpdateBriefButton from './update-brief.button';
import { Brief } from '../../models/brief';

interface Props {
  item: Brief;
}

export default function BriefListItem({ item }: Props) {
  return (
    <List.Item
      actions={[
        <QuestionsBriefButton id={item.id} />,
        <ToggleActiveButton item={item} />,
        <UpdateBriefButton id={item.id} />,
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

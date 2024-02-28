import { List, Tag } from 'antd';

import UpdateCompletedBriefButton from './update-completed-brief.button';
import { CompletedBrief } from '../../models/completed-brief';
import formatDate from '../../utils/format-date';

interface Props {
  item: CompletedBrief;
}

export default function CompletedBriefListItem({ item }: Props) {
  return (
    <List.Item actions={[<UpdateCompletedBriefButton id={item.id} />]}>
      <div>
        <Tag>{formatDate(item.dateCompleted)}</Tag>
        {item.brief.title}
      </div>
    </List.Item>
  );
}

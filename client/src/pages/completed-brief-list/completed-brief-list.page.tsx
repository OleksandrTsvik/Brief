import { List } from 'antd';

import CompletedBriefListItem from './completed-brief-list.item';
import { useGetCompletedBriefsQuery } from '../../api/completed-brief.api';

export default function CompletedBriefListPage() {
  const { data, isFetching } = useGetCompletedBriefsQuery();

  return (
    <List
      bordered
      loading={isFetching}
      dataSource={data}
      renderItem={(item) => <CompletedBriefListItem item={item} />}
    />
  );
}

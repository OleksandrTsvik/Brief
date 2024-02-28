import { List, Typography } from 'antd';

import CompletedBriefListItem from './completed-brief-list.item';
import { useGetCompletedBriefsQuery } from '../../api/completed-brief.api';

export default function CompletedBriefListPage() {
  const { data, isFetching } = useGetCompletedBriefsQuery();

  return (
    <>
      <Typography.Title level={5}>
        Всього завершених брифів: {data?.length ? data.length : 0}
      </Typography.Title>
      <List
        bordered
        loading={isFetching}
        dataSource={data}
        renderItem={(item) => <CompletedBriefListItem item={item} />}
      />
    </>
  );
}

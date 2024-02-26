import { List } from 'antd';

import BriefListItem from './brief-list.item';
import CreateBriefButton from './create-brief.button';
import { useGetBriefsQuery } from '../../api/brief.api';

export default function BriefListPage() {
  const { data, isFetching } = useGetBriefsQuery();

  return (
    <>
      <CreateBriefButton />
      <List
        bordered
        loading={isFetching}
        dataSource={data}
        renderItem={(item) => <BriefListItem item={item} />}
      />
    </>
  );
}

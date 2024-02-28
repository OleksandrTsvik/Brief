import { Typography } from 'antd';

import BriefForm from './brief.form';
import { useGetActiveBriefQuery } from '../../api/brief.api';
import { CustomSpin } from '../../components';

export default function BriefPage() {
  const { data, isFetching } = useGetActiveBriefQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isFetching) {
    return <CustomSpin />;
  }

  if (!data) {
    return <Typography.Title>Активні брифи відсутні :(</Typography.Title>;
  }

  return (
    <>
      <Typography.Title style={{ textAlign: 'center' }}>
        Бриф &#171;{data.title}&#187;
      </Typography.Title>
      <BriefForm briefId={data.id} questions={data.questions} />
    </>
  );
}

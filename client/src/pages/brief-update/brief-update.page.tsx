import { Breadcrumb } from 'antd';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

import { useGetBriefQuery, useUpdateBriefMutation } from '../../api/brief.api';
import { CustomSpin } from '../../components';
import BriefSaveForm, { FormValues } from '../brief-create/brief-save.form';

export default function BriefUpdatePage() {
  const { id } = useParams();
  const { data, isFetching } = useGetBriefQuery({ id: id as string });

  const navigate = useNavigate();
  const [updateBrief, { isLoading, isError, error }] = useUpdateBriefMutation();

  if (isFetching) {
    return <CustomSpin />;
  }

  if (!data) {
    return <Navigate to="/not-found" replace />;
  }

  const handleSubmit = (values: FormValues) => {
    updateBrief({ id: id as string, ...values })
      .unwrap()
      .then(() => navigate('/admin/briefs'));
  };

  return (
    <>
      <Breadcrumb
        items={[
          { title: <Link to="/admin/briefs">Брифи</Link> },
          {
            title: <>Редагування брифу &#171;{data.title}&#187;</>,
          },
        ]}
        style={{ marginBottom: 16 }}
      />
      <BriefSaveForm
        submitText="Оновити"
        initialValues={data}
        isLoading={isLoading}
        isError={isError}
        error={error}
        onSubmit={handleSubmit}
      />
    </>
  );
}

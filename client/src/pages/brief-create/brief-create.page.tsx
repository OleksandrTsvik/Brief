import { Breadcrumb } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import BriefSaveForm, { FormValues } from './brief-save.form';
import { useCreateBriefMutation } from '../../api/brief.api';

export default function BriefCreatePage() {
  const navigate = useNavigate();
  const [createBrief, { isLoading, isError, error }] = useCreateBriefMutation();

  const handleSubmit = (values: FormValues) => {
    createBrief(values)
      .unwrap()
      .then(() => navigate('/admin/briefs'));
  };

  return (
    <>
      <Breadcrumb
        items={[
          { title: <Link to="/admin/briefs">Брифи</Link> },
          { title: 'Створення брифу' },
        ]}
        style={{ marginBottom: 16 }}
      />
      <BriefSaveForm
        submitText="Створити"
        initialValues={{ isActive: false }}
        isLoading={isLoading}
        isError={isError}
        error={error}
        onSubmit={handleSubmit}
      />
    </>
  );
}

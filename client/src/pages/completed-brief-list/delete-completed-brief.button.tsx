import { DeleteOutlined } from '@ant-design/icons';
import { App, Button } from 'antd';

import { useDeleteCompletedBriefMutation } from '../../api/completed-brief.api';
import { CompletedBrief } from '../../models/completed-brief';
import formatDate from '../../utils/format-date';

interface Props {
  item: CompletedBrief;
}

export default function DeleteCompletedBriefButton({ item }: Props) {
  const { modal } = App.useApp();

  const [deleteCompletedBrief, { isLoading }] =
    useDeleteCompletedBriefMutation();

  const handleDelete = async () => {
    const confirmed = await modal.confirm({
      title: `Видалити історію про завершений бриф "${item.brief.title}" (${formatDate(item.dateCompleted)})?`,
      okText: 'Так',
      okButtonProps: { danger: true },
      cancelText: 'Ні',
    });

    if (confirmed) {
      deleteCompletedBrief({ id: item.id }).unwrap();
    }
  };

  return (
    <Button
      danger
      type="primary"
      icon={<DeleteOutlined />}
      loading={isLoading}
      onClick={handleDelete}
    />
  );
}

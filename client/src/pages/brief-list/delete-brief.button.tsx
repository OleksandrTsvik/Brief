import { DeleteOutlined } from '@ant-design/icons';
import { App, Button } from 'antd';

import { useDeleteBriefMutation } from '../../api/brief.api';
import { Brief } from '../../models/brief';

interface Props {
  item: Brief;
}

export default function DeleteBriefButton({ item }: Props) {
  const { modal } = App.useApp();

  const [deleteBrief, { isLoading }] = useDeleteBriefMutation();

  const handleDelete = async () => {
    const confirmed = await modal.confirm({
      title: `Видалити бриф "${item.title}"?`,
      okText: 'Так',
      okButtonProps: { danger: true },
      cancelText: 'Ні',
    });

    if (confirmed) {
      deleteBrief({ id: item.id }).unwrap();
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

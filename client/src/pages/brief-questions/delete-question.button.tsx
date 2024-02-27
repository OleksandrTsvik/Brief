import { DeleteOutlined } from '@ant-design/icons';
import { App, Button } from 'antd';

import { useDeleteQuestionMutation } from '../../api/question.api';
import { Question } from '../../models/question';

interface Props {
  item: Question;
}

export default function DeleteQuestionButton({ item }: Props) {
  const { modal } = App.useApp();

  const [deleteQuestion, { isLoading }] = useDeleteQuestionMutation();

  const handleDelete = async () => {
    const confirmed = await modal.confirm({
      title: `Видалити запитання "${item.question}"?`,
      okText: 'Так',
      okButtonProps: { danger: true },
      cancelText: 'Ні',
    });

    if (confirmed) {
      deleteQuestion({ id: item.id }).unwrap();
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

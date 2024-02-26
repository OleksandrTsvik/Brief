import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { useToggleActiveMutation } from '../../api/brief.api';
import { Brief } from '../../models/brief';

interface Props {
  item: Brief;
}

export default function ToggleActiveButton({ item }: Props) {
  const [toggleActive, { isLoading }] = useToggleActiveMutation();

  const handleToggle = async () => {
    toggleActive({
      id: item.id,
      title: item.title,
      isActive: !item.isActive,
    }).unwrap();
  };

  return (
    <Button
      type="primary"
      loading={isLoading}
      icon={item.isActive ? <CloseOutlined /> : <CheckOutlined />}
      style={{ background: item.isActive ? '#d8bd14' : '#49aa19' }}
      onClick={handleToggle}
    />
  );
}

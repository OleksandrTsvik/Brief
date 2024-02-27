import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

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
    <Tooltip
      title={item.isActive ? 'Приховати' : 'Активувати'}
      color={item.isActive ? '#d8bd14' : '#49aa19'}
    >
      <Button
        type="primary"
        loading={isLoading}
        icon={item.isActive ? <CloseOutlined /> : <CheckOutlined />}
        style={{ background: item.isActive ? '#d8bd14' : '#49aa19' }}
        onClick={handleToggle}
      />
    </Tooltip>
  );
}

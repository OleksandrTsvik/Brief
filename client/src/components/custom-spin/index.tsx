import { LoadingOutlined } from '@ant-design/icons';
import { Spin, SpinProps } from 'antd';

interface Props extends SpinProps {
  height?: number;
  fontSize?: number;
}

export default function CustomSpin({
  height = 56,
  fontSize = 24,
  ...props
}: Props) {
  return (
    <Spin
      tip="Завантаження даних ..."
      indicator={<LoadingOutlined spin style={{ fontSize }} />}
      {...props}
    >
      <div style={{ height }} />
    </Spin>
  );
}

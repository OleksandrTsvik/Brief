import { Radio, Input, Flex } from 'antd';
import { useState, ChangeEvent } from 'react';

interface Props {
  initValue?: string;
  name: string;
  formSetFieldValue: (name: string, value: string) => void;
}

export default function RadioInput({
  initValue = '',
  name,
  formSetFieldValue,
}: Props) {
  const [value, setValue] = useState(initValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    formSetFieldValue(name, event.target.value);
    setValue(event.target.value);
  };

  return (
    <Flex align="center">
      <Radio value={value}>Інше:</Radio>
      <Input size="small" value={value} onChange={handleChange} />
    </Flex>
  );
}

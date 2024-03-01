import { Input, Checkbox, Flex } from 'antd';
import { useState, ChangeEvent } from 'react';

interface Props {
  initValue?: string;
  name: string;
  otherCheckboxValues: string[];
  formSetFieldValue: (name: string, value: string[]) => void;
  formGetFieldValue: (name: string) => string | string[];
}

export default function CheckboxInput({
  initValue = '',
  name,
  otherCheckboxValues,
  formSetFieldValue,
  formGetFieldValue,
}: Props) {
  const [value, setValue] = useState(initValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const formAnswers = formGetFieldValue(name);

    const answers: string[] = Array.isArray(formAnswers)
      ? formAnswers.filter((value) => otherCheckboxValues.includes(value))
      : [formAnswers];

    formSetFieldValue(name, [...answers, event.target.value]);
    setValue(event.target.value);
  };

  return (
    <Flex align="center">
      <Checkbox value={value}>Інше:</Checkbox>
      <Input size="small" value={value} onChange={handleChange} />
    </Flex>
  );
}

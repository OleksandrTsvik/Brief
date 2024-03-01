export default function getOtherInputInitValue(
  initValue: string | string[] | undefined,
  answers: string[],
): string {
  if (!initValue) {
    return '';
  }

  if (typeof initValue === 'string') {
    return answers.includes(initValue) ? '' : initValue;
  }

  const filterInitValues = initValue.filter(
    (value) => !answers.includes(value),
  );

  if (filterInitValues.length > 0) {
    return filterInitValues[0];
  }

  return '';
}

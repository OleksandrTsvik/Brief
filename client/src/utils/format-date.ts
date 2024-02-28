export default function formatDate(date: Date | string): string {
  const newDate = new Date(date);

  const day = addZero(newDate.getDate());
  const month = addZero(newDate.getMonth() + 1);
  const year = newDate.getFullYear();

  return `${day}.${month}.${year}`;
}

function addZero(num: number): string {
  return num > 9 ? num.toString() : `0${num}`;
}

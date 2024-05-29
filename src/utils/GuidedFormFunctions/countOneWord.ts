export default function countOneWord(
  event: React.ChangeEvent<HTMLInputElement>,
) {
  return event.target.value.split(' ').length === 1;
}

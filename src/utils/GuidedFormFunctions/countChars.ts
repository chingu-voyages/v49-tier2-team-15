export default function countChars(event: React.ChangeEvent<HTMLInputElement>) {
  return event.target.value.length <= 255;
}

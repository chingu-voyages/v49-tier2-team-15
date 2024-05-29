type AnyObject = { [key: string]: unknown };

// Check if the value is empty
function isEmptyValue(value: unknown) {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string' && value.trim() === '') return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === 'object' && Object.keys(value).length === 0) return true;
  return false;
}
// Return true if one or more values are empty
export default function hasEmptyValues(obj: AnyObject): boolean {
  return Object.values(obj).some(isEmptyValue);
}

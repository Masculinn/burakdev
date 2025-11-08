export default async function safe<T>(
  fn: () => Promise<T>,
): Promise<[T | null, null | unknown]> {
  try {
    return [await fn(), null];
  } catch (error) {
    return [null, error];
  }
}

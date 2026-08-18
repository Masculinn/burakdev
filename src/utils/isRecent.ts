export function isRecent(date: string, days: number = 3): boolean {
  const now = Date.now();
  const _date = new Date(date).getTime();
  const msperDay = 24 * 60 * 60 * 1000;
  const diff = now - _date;
  return diff >= 0 && diff < days * msperDay;
}

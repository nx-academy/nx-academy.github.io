export function estimateReadingTime(
  text: string,
  wordsPerMinute: number
): number {
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);

  return time;
}

/**
 * Merge class names conditionally.
 */
export function cn(...inputs: (string | undefined | null | false | 0)[]): string {
  return inputs.filter(Boolean).join(' ');
}

/** Format a number with commas */
export function formatNumber(n: number): string {
  return n.toLocaleString();
}

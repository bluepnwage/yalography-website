export function formatNum(num: number, options?: Intl.NumberFormatOptions) {
  const formatter = new Intl.NumberFormat("en-US", {
    compactDisplay: "short",
    notation: "compact",
    ...options
  });
  return formatter.format(num);
}

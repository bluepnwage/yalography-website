export function formatNum(num: number) {
  const formatter = new Intl.NumberFormat("en-US", { compactDisplay: "short", notation: "compact" });
  return formatter.format(num);
}

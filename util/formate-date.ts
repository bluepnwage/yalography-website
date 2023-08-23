export function formatDate(date: Date, options?: Intl.DateTimeFormatOptions) {
  const formatter = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", ...options });
  return formatter.format(date);
}

export function displayText(text?: string) {
  return text || "-";
}

export function pluralize(count: number, label: string) {
  return count && count > 1 ? `${label}s` : label;
}

export function formatDuration({
  hours,
  minutes,
  seconds,
}: {
  hours: number;
  minutes: number;
  seconds: number;
}) {
  return [
    `${String(new Intl.NumberFormat().format(hours)).padStart(2, "0").trim()}${pluralize(hours, "hr")}`,
    `${String(new Intl.NumberFormat().format(minutes)).padStart(2, "0").trim()}${pluralize(minutes, "min")}`,
    `${String(new Intl.NumberFormat().format(seconds)).padStart(2, "0").trim()}${pluralize(seconds, "sec")}`,
  ].join(":");
}

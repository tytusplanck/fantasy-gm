export function isoNow(): string {
  return new Date().toISOString();
}

export function dateStamp(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

export function timestampForFile(date = new Date()): string {
  return date.toISOString().replace(/[:.]/g, "-");
}

export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

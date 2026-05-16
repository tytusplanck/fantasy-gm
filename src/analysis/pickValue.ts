export function describePickValue(asset: string): string {
  const normalized = asset.toLowerCase();
  if (normalized.includes("early 1st") || normalized.match(/\b1\.0[1-4]\b/)) {
    return "premium rookie pick";
  }
  if (normalized.includes("mid 1st") || normalized.match(/\b1\.0[5-8]\b/)) {
    return "strong rookie pick";
  }
  if (normalized.includes("late 1st") || normalized.match(/\b1\.0(9|10|11|12)\b/)) {
    return "useful but fragile first-round pick";
  }
  if (normalized.includes("1st")) {
    return "future first with value depending heavily on manager trajectory";
  }
  if (normalized.includes("2nd")) {
    return "second-round pick, usually a sweetener unless this league prices picks aggressively";
  }
  if (normalized.includes("3rd") || normalized.includes("4th")) {
    return "late rookie pick, mostly a throw-in unless benches/taxi are deep";
  }
  return "not a clear rookie-pick asset";
}

import { mkdir, readFile, readdir, stat, writeFile, appendFile } from "node:fs/promises";
import path from "node:path";

export function rootPath(...parts: string[]): string {
  return path.resolve(process.cwd(), ...parts);
}

export async function ensureDir(dirPath: string): Promise<void> {
  await mkdir(dirPath, { recursive: true });
}

export async function pathExists(filePath: string): Promise<boolean> {
  try {
    await stat(filePath);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return false;
    }
    throw error;
  }
}

export async function readTextIfExists(filePath: string): Promise<string> {
  if (!(await pathExists(filePath))) {
    return "";
  }
  return readFile(filePath, "utf8");
}

export async function readJsonIfExists<T>(filePath: string): Promise<T | undefined> {
  if (!(await pathExists(filePath))) {
    return undefined;
  }
  return JSON.parse(await readFile(filePath, "utf8")) as T;
}

export async function writeJsonFile(filePath: string, data: unknown): Promise<void> {
  await ensureDir(path.dirname(filePath));
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export async function writeTextFile(filePath: string, data: string): Promise<void> {
  await ensureDir(path.dirname(filePath));
  await writeFile(filePath, data.endsWith("\n") ? data : `${data}\n`, "utf8");
}

export async function appendTextFile(filePath: string, data: string): Promise<void> {
  await ensureDir(path.dirname(filePath));
  await appendFile(filePath, data.endsWith("\n") ? data : `${data}\n`, "utf8");
}

export async function listJsonFiles(dirPath: string): Promise<string[]> {
  if (!(await pathExists(dirPath))) {
    return [];
  }
  const entries = await readdir(dirPath);
  return entries.filter((entry) => entry.endsWith(".json")).sort();
}

export function compactUndefined<T extends Record<string, unknown>>(value: T): Partial<T> {
  return Object.fromEntries(Object.entries(value).filter(([, entry]) => entry !== undefined)) as Partial<T>;
}

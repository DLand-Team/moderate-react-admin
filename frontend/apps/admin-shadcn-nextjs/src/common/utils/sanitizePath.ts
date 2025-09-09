export function sanitizePath(path: string): string {
  // 同时去除末尾的斜杠和换行符
  return path.replace(/[/\n]+$/g, "");
}

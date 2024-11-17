export function dataURLToBlob(dataurl: string) {
  const type = dataurl.match(/data:(.+);/)?.[1];
  const base64 = dataurl.split(',')[1];
  const binStr = atob(base64);
  const u8a = new Uint8Array(binStr.length);
  let p = binStr.length;
  while (p) {
    p--;
    u8a[p] = binStr.codePointAt(p)!;
  }
  return new Blob([u8a], { type });
}

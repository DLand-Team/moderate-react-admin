import { ROUTE_ID_KEY } from "src/router";

export function enumToObject<T extends Record<keyof T, number | string>>(
  enumObj: T,
): { [K in keyof T]: ROUTE_ID_KEY } {
  const obj = {} as { [K in keyof T]: T[K] };
  for (const key in enumObj) {
    const keyStr = enumObj[key];
    if (typeof keyStr !== "number") {
      //@ts-ignore
      obj[keyStr] = enumObj[key];
    }
  }
  return obj as any;
}

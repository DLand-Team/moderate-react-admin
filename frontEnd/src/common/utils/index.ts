import type { RouteKeyT } from "@/permissions/routerConfig";
export const UUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const addCodeToPermission = <T>(data: any) => {
  let num = 0;
  for (let key in data) {
    const item = data[key as RouteKeyT];
    item.code = 2 ** num+"";
    item.name = key;
    num++;
  }
  return data;
};

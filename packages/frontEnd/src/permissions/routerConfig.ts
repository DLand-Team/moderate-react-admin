import { addCodeToPermission } from "@/common/utils/index";
import { ROUTE_ID } from "@/router/config";

export type RouteKeyT = keyof typeof ROUTE_ID;
export type RouteRecordRawCustom = any;

export const ROUTE_PERMISSION = addCodeToPermission<{
  id: symbol;
  title: string;
  code?: string;
}>({
  index: { id: Symbol(), title: "首页" },
  sys: { id: Symbol(), title: "系统管理" },
  user: { id: Symbol(), title: "用户管理" },
  role: { id: Symbol(), title: "角色管理" },
});


import { addCodeToPermission } from "@/common/utils/index";

export type RouteKeyT = keyof typeof RouteIds;
export type RouteRecordRawCustom = any

export const RouteIds = {
  index: "index",
  sys: "sys",
  role: "role",
  user: "user",
};

export const ROUTE_PERMISSION = addCodeToPermission<{
  id: symbol;
  title: string;
  code?: string;
}>({
  index: { id: Symbol(), title: "添加" },
  sys: { id: Symbol(), title: "系统管理" },
  user: { id: Symbol(), title: "用户管理" },
  role: { id: Symbol(), title: "角色管理" },
});

const { index, sys, user, role } = ROUTE_PERMISSION;
export const routesData =  [
  {
    name: index.name,
    meta: {
      title: "首页",
      icon: "system",
      noCache: false,
      link: null,
    },
  },
  {
    name: sys.name,
    meta: {
      title: "系统管理",
      icon: "system",
      noCache: false,
      link: null,
    },
    children: [
      {
        name: user.name,
        meta: {
          title: "用户管理",
          icon: "user",
          noCache: false,
          link: null,
        },
      },
      {
        name: role.name,
        meta: {
          title: "角色管理",
          icon: "role",
          noCache: false,
          link: null,
        },
      },
    ],
  },
]


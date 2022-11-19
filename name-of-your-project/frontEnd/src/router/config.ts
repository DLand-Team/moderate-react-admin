import { Login, Center, Page1, Hello, UserPage, RolePage } from "../pages";
export default {
  center: {
    meta: {
      title: "中心",
    },
  },
  hello: {
    meta: {
      title: "首页",
    },
    component: Hello,
  },
  sys: {
    meta: {
      title: "系统管理",
    },
  },
  user: {
    meta: {
      title: "用户管理",
    },
    component: UserPage,
  },
  role: {
    meta: {
      title: "角色管理",
    },
    component: RolePage,
    state: { a: 1111 },
  },
};

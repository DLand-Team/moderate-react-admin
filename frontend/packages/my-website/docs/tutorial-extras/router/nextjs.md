---
sidebar_position: 1
---


# Next.js

Next.js 原生采用约定式、基于文件系统的路由机制。

那为什么还需要额外配置路由？

主要是为了满足更复杂的业务需求，例如：

- 支持 KeepAlive 页面缓存
- 多标签页（Tab）窗口
- 菜单权限控制
- 函数式路由跳转
- 自动补全路由 path，减少重复配置
- 以及其他路由元信息的灵活扩展

本方案通过配置化的数据结构和统一的 routerHelper 工具，将所有与路由相关的业务接口集中管理，极大简化了路由与接口的维护流程，提升了项目的可扩展性和长期可维护性。



## 主要文件说明

- **router-name**：为每个路由分配唯一标识
- **routes-config**：配置路由的基本信息
- **router-provider**：增强路由能力，如自动补全 path、提供函数式跳转等
- **router-type**：路由相关的类型定义


## 如何创建一个新路由

### 第一步：在 router-name.ts 中添加路由名称

```ts title="src/router/router-name.ts"
export enum ROUTE_NAME {
  // ... 其他路由名称
  user,
}
```


### 第二步：在 routes-config.ts 中添加路由配置

```ts title="src/router/routes-config.ts"
import { ROUTE_NAME } from "./router-name";
import User from "@/pages/User"; // 假设你有一个User页面组件

const routesConfig = {
  user: {
    id: "user",
    meta: {
      title: "common:UserPageTitle",
      icon: "FundProjectionScreenOutlined",
    },
  },
};

export default routesConfig;
```


### 第三步：路由跳转

可在全局任意位置通过函数方式跳转，组件外也能直接调用：

```ts
routerHelper.jumpTo(ROUTE_NAME.dashboard);
```

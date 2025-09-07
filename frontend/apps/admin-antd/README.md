# admin-antd

本项目是一个基于 Ant Design 的 React 管理后台子项目，属于多项目仓库（monorepo）中的一部分。主要用于实现后台管理系统的前端界面，提供用户管理、权限控制、数据展示等功能。项目采用现代前端技术栈，便于与主项目及其他子项目协同开发和维护。

## 技术栈

- React
- Ant Design
- TypeScript
- 状态管理：Redux Toolkit
- 路由管理：React Router

## 主要功能

- 用户管理
- 权限控制
- 数据可视化
- 角色与菜单管理
- 审计日志

## 适用场景

- 企业级管理后台
- 数据管理平台

## 运行方式

1. 安装依赖：

    ```bash
    pnpm install
    ```

2. 启动开发服务器：

    ```bash
    pnpm dev
    ```

3. 构建生产环境代码：

    ```bash
    pnpm build
    ```

## 项目结构设计

```
admin-antd/
├── public/               # 静态资源
├── src/
│   ├── api/              # 接口请求封装
│   ├── assets/           # 图片、样式等资源
│   ├── components/       # 通用组件
│   ├── features/         # 业务模块（Redux slices）
│   ├── layouts/          # 页面布局
│   ├── pages/            # 路由页面
│   ├── routes/           # 路由配置
│   ├── store/            # Redux store 配置
│   ├── utils/            # 工具函数
│   └── App.tsx           # 应用入口
├── package.json
└── README.md
```

## 状态管理方案

项目采用 Redux Toolkit 进行全局状态管理，结合 React-Redux 实现组件间的数据共享。每个业务模块在 `features/` 目录下维护独立的 slice，便于模块化开发和维护。

## MVC 分层设计

- **Model（模型）**：数据结构和接口请求逻辑，主要集中在 `api/` 和 `features/` 目录。
- **View（视图）**：页面和组件，分布在 `pages/`、`components/` 和 `layouts/` 目录。
- **Controller（控制器）**：业务逻辑和状态管理，主要通过 Redux slices 和异步 action 实现，位于 `features/` 和 `store/` 目录。

如需了解更多，请参考主项目文档或相关子项目说明。
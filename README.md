# Moderate

![图片描述](./_assets/info.png)

---

[English Version (Switch to English)](./README.en-US.md)

---

## 资源链接

-   [在线预览](http://111.229.110.163/)
-   [文档地址](https://dland-team.github.io/moderate-react-admin/)

## 核心特性

-   🍎 **无缝对接 ruoyi-pro**  
    内置双 token 机制，用户管理、角色管理、菜单管理等核心功能已对接，无需配置，开箱即用。

-   🍇 **真正的业务分层**  
    代码分层明确，业务与 UI 解耦，结构清晰，易于维护与扩展。

-   🥥 **NextJS 完美适配**  
    支持 App 模式下的 keepalive，配套 Tab 窗口，提升多任务场景体验。

-   🥕 **业务插件化**  
    业务能力可插拔，支持组件、Provider、路由、i18n 等插件式接入，实现真正的复用和沉淀。

-   🍞 **增强路由系统**  
    支持 KeepAlive 和多标签页，具备 useActive 监听 hook，可靠性更强。

-   🥦 **Node.js 赋能开发**  
    支持约定式路由，可视化生成路由与状态仓库，大幅提升开发效率。

-   🥑 **极致状态管理**  
    深度整合 Redux 生态，语法简洁，上手无门槛，类型提示友好，易于维护。

## 技术选型

-   React 18 / React 19
-   Ant Design 5 / Shadcn
-   Redux
-   React Router
-   Rsbuild / Vite
-   TypeScript

## 组件库支持矩阵

| 组件库      | NextJs | 纯前端 | 适用场景     | 推荐策略                                                     |
| ----------- | ------ | ------ | ------------ | ------------------------------------------------------------ |
| Antd        | ☑️     | ✅     | 大而全、稳健 | 一步到位，省心省力，覆盖广泛，适合绝大多数场景和开发者。     |
| Material UI | ☑️     | ☑️     | 可定制、专业 | 对视觉、功能有较高定制需求时优选，适合有经验的高级开发者。   |
| Shadcn UI   | ✅     | ☑️     | 轻量、灵活   | 适合追求极致自定义和轻量化的开发者，快速启动、融合社区资源。 |

### Shadcn-NextJs 版本界面预览

| ![](_assets/shadcn-nextjs-2.png) | ![](_assets/shadcn-nexts-1.png) |
| :------------------------------: | :-----------------------------: |

## ruoyi-pro 核心功能对接

### 用户管理

![图片描述](./_assets/user.png)

### 角色管理

![图片描述](./_assets/role.png)

### 菜单管理

![图片描述](./_assets/menu.png)

### 代码生成

![图片描述](./_assets/code.png)

## 快速开始

### 前端启动

```bash
# 安装依赖
pnpm i

# 启动服务
pnpm run start
```

### 后端说明

本地开发推荐自建芋道 ruoyi 项目进行接口对接。
如无需本地配置，可直接体验：项目默认对接了我的测试服务器，无需额外配置，开箱即用。

## 项目结构说明

本项目采用 turborepo 管理 monorepo，结构清晰，易于扩展和维护：

-   `apps/`：主应用目录，所有前端项目（如 admin-antd、admin-shadcn-nextjs）均在此文件夹下。
-   `packages/`：通用库和工具包目录，包含 dev-server、UI 组件库、eslint/ts 配置、文档等。
-   `frontend/`：前端相关代码，未来如有后端将新增 `backend/` 目录。
-   `_assets/`：项目文档图片资源。

### 本地运行

1. 安装依赖（在项目根目录）：
    ```bash
    pnpm install
    ```
2. 启动前端项目（以 admin-antd 为例）：
    ```bash
    pnpm --filter admin-antd dev
    ```
    或进入 `apps/admin-antd` 目录后运行：
    ```bash
    pnpm run dev
    ```
3. 其他应用或包请参考各自目录下的 README 说明。

---

## 社区交流

欢迎加入「闲 D 岛 🏝️」技术交流群，这里有大厂工程师、独立开发者、外包团队和热心小伙伴，氛围纯净，技术交流活跃，期待你的加入！

-   **闲 D 岛 1 群**（500+ 人）：551406017
-   **闲 D 岛 2 群**：1002504812

---

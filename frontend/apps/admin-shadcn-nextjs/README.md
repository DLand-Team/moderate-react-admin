# 项目简介

本项目基于 **Next.js** 和 **shadcn/ui**，支持 App Router 模式下的页面 KeepAlive，拥有强化的路由系统和高效的状态管理，适合中大型后台管理系统开发。

## 技术栈

- **Next.js**：React 生态下的服务端渲染与静态网站生成框架，支持 App Router，性能优异，SEO 友好。
- **shadcn/ui**：现代化、可定制的 React 组件库，设计美观，易于扩展和主题定制。
- **Redux**：强大的全局状态管理方案，方便数据流管理和调试。

## 主要特性

- **App Router + KeepAlive**：支持页面级缓存，切换路由时保持组件状态，提升用户体验。
- **强化路由系统**：基于 Next.js App Router，支持嵌套路由、动态路由、权限控制等高级特性。
- **高效状态管理**：使用 Redux 统一管理全局状态，便于维护和扩展。
- **现代 UI 体验**：shadcn/ui 提供丰富的组件和主题，快速搭建美观界面。

## 文件结构示例

```
apps/
    admin-shadcn-nextjs/
        app/           # Next.js App Router 页面与布局
        components/    # 通用 React 组件
        features/      # 业务模块（Redux slice）
        store/         # Redux 配置
        styles/        # 全局样式
        public/        # 静态资源
        README.md
```

## shadcn/ui 的优势与玩法

- 组件高度可定制，支持 Tailwind CSS，轻松实现个性化主题。
- 组件库按需引入，减少打包体积。
- 丰富的表单、弹窗、数据展示等后台常用组件。
- 支持无障碍和响应式设计。

## Next.js 的优势

- 支持服务端渲染（SSR）、静态生成（SSG）、增量静态生成（ISR）。
- App Router 提供更灵活的路由和布局能力。
- 内置 API 路由，前后端一体化开发。
- 优秀的性能优化和开发体验。

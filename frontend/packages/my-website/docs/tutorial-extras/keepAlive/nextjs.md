---
sidebar_position: 1
---


# Next.js

本方案为 Next.js 提供了灵活的页面缓存（KeepAlive）能力，适用于多标签页、页面状态保留等复杂场景。

## 主要文件说明

- **keep-alive**：顶层组件，提供全局 KeepAlive 能力
- **keep-alive-sign**：标记需要缓存的页面或组件
- **keep-alive-slot**：定向渲染插槽，实现精准渲染
- **keep-alive-route**：内部业务核心组成，通常无需关注


## 使用方法

### 第一步：在顶层 Layout 包裹 KeepAlive

在页面的 layout 组件（如管理后台 dashboard 的 layout.tsx）中包裹 KeepAlive：

```tsx
<KeepAlive>{children}</KeepAlive>
```

### 第二步：在需要缓存的页面中使用 KeepAliveSign

```tsx
// 客户端渲染，并且需要缓存的组件
const MenuView = () => {
  return <div>菜单页面</div>;
};

export default function MenuPage() {
  const customId = "自定义id";
  return (
    <div>
      {/* 其他组件，可为服务端或客户端组件。key 用于复杂场景避免渲染错位 */}
      <KeepAliveSign key={customId} routeId={customId} ClientView={MenuView}>
        ...
      </KeepAliveSign>
    </div>
  );
}
```

- **routeId**：路由唯一标识，必须唯一，用于标记缓存页面
- **key**：唯一标识，建议复杂场景下使用，避免渲染错位
- **ClientView**：需要被缓存的客户端组件

### 第三步：在 KeepAliveSign 内使用 KeepAliveSlot 实现定点渲染

与服务端组件组合渲染时，KeepAliveSlot 可实现精准定位：

```tsx
export default function MenuPage() {
  const customId = "自定义id";
  return (
    <div>
      <KeepAliveSign key={customId} routeId={customId} ClientView={MenuView}>
        {/* 其他组件，可为服务端或客户端组件 */}
        <KeepAliveSlot id={customId} />
        {/* 其他组件，可为服务端或客户端组件 */}
      </KeepAliveSign>
    </div>
  );
}
```

- **id**：需与 KeepAliveSign 的 routeId 保持一致，无需设置不同值

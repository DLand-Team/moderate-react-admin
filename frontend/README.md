# Turbo 用法简介

[Turbo](https://turbo.build/) 是一个高性能的构建系统和任务运行器，常用于管理 monorepo 项目。以下是 Turbo 的基本用法：

## 安装

```bash
npm install turbo --save-dev
```

或使用 `pnpm`/`yarn` 安装。

## 配置

在项目根目录下创建 `turbo.json` 文件：

```json
{
    "pipeline": {
        "build": {
            "dependsOn": ["^build"],
            "outputs": [".next/**", "dist/**"]
        },
        "lint": {},
        "test": {}
    }
}
```

## 常用命令

- **运行任务**  
    ```bash
    npx turbo run build
    ```
    运行所有包的 `build` 脚本，并自动处理依赖关系。

- **并行执行**  
    Turbo 会自动并行执行无依赖的任务，加快构建速度。

- **缓存**  
    Turbo 支持智能缓存，跳过未变更的任务，提升效率。

## 适用场景

- 管理 monorepo 多包项目
- 优化 CI/CD 流程
- 提升本地开发和构建速度

更多详细用法请参考 [官方文档](https://turbo.build/docs)。
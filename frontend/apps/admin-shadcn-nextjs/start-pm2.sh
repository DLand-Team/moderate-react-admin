#!/bin/bash

# PM2 启动脚本
echo "启动 admin-shadcn-nextjs 应用..."

# 确保先构建应用
echo "构建应用..."
npm run build

# 使用 PM2 启动应用
echo "使用 PM2 启动应用..."
pm2 start ecosystem.config.js

# 显示 PM2 状态
pm2 status

echo "应用已启动！"
echo "应用将在端口 3002 上运行: http://localhost:3002"
echo "可以使用以下命令管理应用："
echo "  pm2 status           - 查看应用状态"
echo "  pm2 logs             - 查看日志"
echo "  pm2 restart admin-shadcn-nextjs  - 重启应用"
echo "  pm2 stop admin-shadcn-nextjs     - 停止应用"
echo "  pm2 delete admin-shadcn-nextjs   - 删除应用"
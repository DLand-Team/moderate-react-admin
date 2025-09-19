module.exports = {
  apps: [
    {
      name: 'admin-shadcn-nextjs',
      script: 'npm',
      args: 'start',
      cwd: '/Users/johnlee/workSpace/current/moderate-react-admin/frontend/apps/admin-shadcn-nextjs',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3002
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3002
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3002
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      log_date_format: 'YYYY-MM-DD HH:mm Z'
    }
  ]
};
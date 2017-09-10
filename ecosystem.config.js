module.exports = {
  apps: [
    {
      name: 'vsnet-auth',
      script: './src/server.js',
      exec_mode: 'cluster',
      instances: 0,
      wait_ready: true,
      env: {
        NODE_ENV: 'development',
        PORT: 8000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 8000
      }
    }
  ]
}

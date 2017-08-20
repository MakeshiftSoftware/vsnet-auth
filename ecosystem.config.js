module.exports = {
  apps: [
    {
      name: 'app',
      script: './core/server.js',
      exec_mode: 'cluster',
      instances: 0,
      wait_ready: true,
      watch: true,
      env: {
        PORT: 3000,
        NODE_ENV: 'development'
      },
      env_production: {
        PORT: 80,
        NODE_ENV: 'production'
      }
    }
  ]
}

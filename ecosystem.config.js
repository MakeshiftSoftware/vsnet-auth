module.exports = {
  apps : [
      {
        name: 'app',
        script: './core/server.js',
        wait_ready: true,
        exec_mode: 'cluster',
        env: {
            PORT: 3000,
            NODE_ENV: 'development',
            instances: 1
        },
        env_production: {
            PORT: 80,
            NODE_ENV: 'production',
            instances: 0
        }
      }
  ]
}
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
        PORT: 8000,
        DB_DEV: 'postgres://user@postgres/makeshift',
        APP_SECRET: 'SECURE_JWT_SECRET'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 8000,
        DB_PROD: 'postgres://user@postgres/makeshift',
        APP_SECRET: 'SECURE_JWT_SECRET'
      }
    }
  ]
};

/* eslint-disable no-process-exit, no-console */
const os = require('os');
const cluster = require('cluster');
const http = require('http');
const app = require('./app');
const models = require('./models');

if (cluster.isMaster) {
  for (let i = 0; i < os.cpus().length; ++i) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    if (!worker.exitedAfterDisconnect) {
      console.log('[Error][auth] Worker has died', worker.process.pid);
      cluster.fork();
    }
  });
} else {
  const start = async () => {
    try {
      const server = http.createServer(app);
      await models.sequelize.authenticate();

      server.listen(process.env.PORT, () => {
        process.on('SIGINT', () => {
          // todo: cleanup then
          // process.exit(err ? 1 : 0);
          process.exit(0);
        });

        process.on('SIGTERM', () => {
          // todo: cleanup then
          // process.exit(err ? 1 : 0);
          process.exit(0);
        });

        if (process.send) {
          process.send('ready');
        }

        console.log('vsnet-auth: listening on', process.env.PORT);
      });
    } catch (err) {
      throw new Error(err);
    }
  };

  start();
}

const http = require('http');
const app = require('./app');
const models = require('./models');

const start = async () => {
  try {
    const server = http.createServer(app);
    await models.sequelize.authenticate();

    server.listen(process.env.PORT, () => {
      process.on('SIGINT', () => {
        // todo: cleanup
        // process.exit(err ? 1 : 0);
        process.exit(0); // eslint-disable-line
      });

      if (process.send) {
        process.send('ready');
      }

      console.log('vsnet-auth: listening on', process.env.PORT); // eslint-disable-line
    });
  } catch (err) {
    throw new Error(err);
  }
};

start();

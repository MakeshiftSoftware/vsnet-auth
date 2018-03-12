module.exports = (res, config) => {
  config.code = config.code || 200;

  return res.status(config.code).send({
    ...config
  });
};

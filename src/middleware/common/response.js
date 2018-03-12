const { success } = require('../../response');

module.exports = (config) => {
  const {
    model,
    instance,
    append
  } = config;

  return (req, res) => {
    let additionalData;

    if (append) {
      additionalData = append(req);
    }

    const responseData = {
      ...model.json(req[instance]),
      ...additionalData
    };

    success(res, {
      data: {
        ...responseData
      }
    });
  };
};

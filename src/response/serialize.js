const serialize = (convert) => (data) => {
  if (!data) {
    return;
  }

  if (Array.isArray(data)) {
    return data.map((d) => (
      convert(d)
    ));
  }

  return convert(data);
};

const user = serialize((data) => ({
  id: data.userId,
  email: data.email,
  username: data.username,
  createdAt: data.createdAt
}));

module.exports = {
  user
};

const jwt = require('jsonwebtoken');

const checkToken = async (token, id, nick, key) => {
  try {
    const decoded = await verifyToken(token, key);
    return decoded.id === id && decoded.nick === nick;
  } catch (err) {
    return false;
  }
};

const verifyToken = (token, key) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, key, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded);
    });
  });
};

const setToken = async (id, key) => {
  if (!id) return false;

  try {
    return await signToken({ id }, key);
  } catch (err) {
    console.error(err);
  }
};

const signToken = (payload, key) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, key, { expiresIn: 28800 }, (err, token) => {
      if (err) reject(err);
      else resolve(token);
    });
  });
};

module.exports = {
  checkToken,
  setToken
};

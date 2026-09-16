const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret';

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    const error = new Error('Se requiere autorización');
    error.statusCode = 401;
    return next(error);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    const error = new Error('Se requiere autorización');
    error.statusCode = 401;
    return next(error);
  }

  req.user = payload;
  return next();
};

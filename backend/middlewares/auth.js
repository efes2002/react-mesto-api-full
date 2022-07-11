const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');

module.exports = (req, res, next) => {
  /*
  const { authorization } = req.headers;
  console.log(1, authorization);
  if (!authorization || !authorization.startsWith('Bearer ')) {
    console.log(2, authorization.startsWith('Bearer '));
    return res.status(401)
      .send({ message: 'Необходима авторизация' });
  }
  const token = authorization.replace('Bearer ', '');
  */
  console.log(77, req.cookies)
  const token = req.cookies.jwt;
  console.log('server auth 11', token)
  if (!token) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};

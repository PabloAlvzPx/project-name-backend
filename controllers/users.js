const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret';

const getCurrentUser = (req, res, next) => User.findById(req.user._id)
  .then((user) => {
    if (!user) {
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404;
      return next(error);
    }
    return res.send(user);
  })
  .catch(next);

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  return bcrypt
    .hash(password, 10)
    .then((hashedPassword) => User.create({ email, password: hashedPassword, name }))
    .then((user) => res.status(201).send({
      _id: user._id,
      email: user.email,
      name: user.name,
    }))
    .catch((err) => {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        const error = new Error('El correo electrónico ya está registrado');
        error.statusCode = 409;
        return next(error);
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      return res.send({ token });
    })
    .catch(next);
};

module.exports = { getCurrentUser, createUser, login };

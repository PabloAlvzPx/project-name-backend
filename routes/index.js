const router = require('express').Router();
const userRouter = require('./users');
const articleRouter = require('./articles');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const {
  validateUserBody,
  validateAuthentication,
} = require('../middlewares/validation');

router.post('/signup', validateUserBody, createUser);
router.post('/signin', validateAuthentication, login);

router.use(auth);

router.use('/users', userRouter);
router.use('/articles', articleRouter);

module.exports = router;

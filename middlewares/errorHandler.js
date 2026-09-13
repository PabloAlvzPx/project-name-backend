const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const { statusCode = 500, message } = err;

  return res.status(statusCode).send({
    message:
      statusCode === 500 ? 'Se ha producido un error en el servidor' : message,
  });
};

module.exports = errorHandler;

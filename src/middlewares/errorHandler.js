const { INTERNAL_SERVER_ERROR } = require("../consts/errors");

const errorHandler = (err, _req, res, next) => {
  if (res.headersSent) return next(err);

  const status = err.status || 500;
  const code = err.code || INTERNAL_SERVER_ERROR.code;

  if (status >= 500) console.error(err);

  const body = {
    success: false,
    code,
    message:
      status >= 500
        ? "An unexpected error occurred."
        : err.message || undefined,
  };

  if (err.errors?.length) body.errors = err.errors;

  res.status(status).json(body);
};

module.exports = errorHandler;

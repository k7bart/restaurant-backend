const {
  UNAUTHORIZED,
  NOT_FOUND,
  FORBIDDEN,
  BAD_REQUEST,
  VALIDATION_ERROR,
  TOO_MANY_REQUESTS,
  INTERNAL_SERVER_ERROR,
} = require("../consts/errors");

const createError = (status, errorInfo) => {
  const err = new Error(errorInfo.message);
  err.status = status;
  err.code = errorInfo.code;

  return err;
};

const createBadRequestError = () => {
  return createError(400, BAD_REQUEST);
};

const createValidationError = (errors) => {
  const err = createError(400, VALIDATION_ERROR);
  err.errors = errors;
  return err;
};

const createUnauthorizedError = () => {
  return createError(401, UNAUTHORIZED);
};

const createForbiddenError = () => {
  return createError(403, FORBIDDEN);
};

const createNotFoundError = () => {
  return createError(404, NOT_FOUND);
};

const createTooManyRequestsError = () => {
  return createError(429, TOO_MANY_REQUESTS);
};

const createServerError = () => {
  return createError(500, INTERNAL_SERVER_ERROR);
};

module.exports = {
  createError,
  createUnauthorizedError,
  createNotFoundError,
  createForbiddenError,
  createBadRequestError,
  createServerError,
  createValidationError,
  createTooManyRequestsError,
};

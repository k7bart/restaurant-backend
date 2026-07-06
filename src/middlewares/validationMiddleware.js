const { checkSchema, validationResult } = require("express-validator");
const { createValidationError } = require("../utils/errorsHelpers");

const validationMiddleware = (schema) => {
  return [
    checkSchema(schema),

    (req, _res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          createValidationError(
            errors.array().map((err) => ({
              field: err.path,
              message: err.msg,
            })),
          ),
        );
      }
      next();
    },
  ];
};

module.exports = validationMiddleware;

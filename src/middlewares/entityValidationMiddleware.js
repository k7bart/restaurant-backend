const { validationResult } = require("express-validator");

const entityValidationMiddleware = (validationRules) => {
  return async (req, res, next) => {
    await Promise.all(validationRules.map((rule) => rule.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  };
};

module.exports = entityValidationMiddleware;

const { param } = require("express-validator");
const { INVALID_ID } = require("../consts/errors");

const validateIdChain = () =>
  param("id").isMongoId().withMessage(INVALID_ID.message);

module.exports = {
  validateIdChain,
};

const { param } = require("express-validator");
const {
  lengths: {
    MAX_NAME_LENGTH,
    MIN_NAME_LENGTH,
    MAX_PROMO_CODE_LENGTH,
    MAX_COMMENT_LENGTH,
  },
} = require("../consts/validation");
const {
  FIELD_CANNOT_BE_EMPTY,
  FIELD_IS_NOT_OF_PROPER_FORMAT,
  INVALID_ID,
  FIELD_CANNOT_BE_LONGER,
} = require("../consts/errors");
const { normalizePhone, isValidPhone } = require("./normalizePhone");

const optionalRule = new Map([
  [false, { optional: { options: { values: "falsy" } } }],
  [true, { optional: true }],
]);

const phoneValidation = (field = "phone", optional = false) => ({
  in: ["body"],
  isString: true,
  trim: true,
  notEmpty: {
    errorMessage: FIELD_CANNOT_BE_EMPTY(field),
    bail: true,
  },
  customSanitizer: { options: normalizePhone },
  custom: {
    options: isValidPhone,
    errorMessage: FIELD_IS_NOT_OF_PROPER_FORMAT(field),
  },
  ...optionalRule.get(optional),
});

const emailValidation = (field = "email") => ({
  in: ["body"],
  isEmail: {
    errorMessage: FIELD_IS_NOT_OF_PROPER_FORMAT(field),
    bail: true,
  },
  isLowercase: {
    errorMessage: "Email must be in lowercase.",
    bail: true,
  },
  ...optionalRule.get(false),
});

const firstNameValidation = (field = "firstName", optional = false) => ({
  in: ["body"],
  isString: true,
  trim: true,
  notEmpty: {
    errorMessage: FIELD_CANNOT_BE_EMPTY(field),
    bail: true,
  },
  isLength: {
    options: { min: MIN_NAME_LENGTH, max: MAX_NAME_LENGTH },
    errorMessage: `First name must be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} characters.`,
    bail: true,
  },
  isAlpha: {
    errorMessage: FIELD_IS_NOT_OF_PROPER_FORMAT(field),
    bail: true,
  },
  ...optionalRule.get(optional),
});

const lastNameValidation = (field = "lastName") => ({
  in: ["body"],
  isString: true,
  trim: true,
  isLength: {
    options: { min: MIN_NAME_LENGTH, max: MAX_NAME_LENGTH },
    errorMessage: `Last name must be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} characters.`,
    bail: true,
  },
  isAlpha: {
    errorMessage: FIELD_IS_NOT_OF_PROPER_FORMAT(field),
    bail: true,
  },
  ...optionalRule.get(true),
});

const validateIdChain = () =>
  param("id").isMongoId().withMessage(INVALID_ID.message);

const promoCodeValidation = (field = "promoCode") => ({
  in: ["body"],
  isString: true,
  trim: true,
  maxLength: {
    options: { max: MAX_PROMO_CODE_LENGTH },
    errorMessage: FIELD_CANNOT_BE_LONGER(field, MAX_PROMO_CODE_LENGTH),
    bail: true,
  },
});

const commentValidation = (field = "comment") => ({
  in: ["body"],
  optional: { options: { values: "falsy" } },
  isString: true,
  trim: true,
  isLength: {
    options: { max: MAX_COMMENT_LENGTH },
    errorMessage: `${field} cannot be longer than ${MAX_COMMENT_LENGTH} characters.`,
  },
});

module.exports = {
  phoneValidation,
  emailValidation,
  firstNameValidation,
  lastNameValidation,
  validateIdChain,
  promoCodeValidation,
  commentValidation,
};

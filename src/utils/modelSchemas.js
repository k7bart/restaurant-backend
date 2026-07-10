const {
  FIELD_CANNOT_BE_EMPTY,
  FIELD_CANNOT_BE_SHORTER,
  FIELD_CANNOT_BE_LONGER,
  FIELD_IS_NOT_OF_PROPER_FORMAT,
} = require("../consts/errors");
const {
  lengths: {
    MAX_NAME_LENGTH,
    MIN_NAME_LENGTH,
    MIN_PASSWORD_LENGTH,
    MAX_PASSWORD_LENGTH,
  },
} = require("../consts/validation");
const validator = require("validator");
const { isValidPhone } = require("./normalizePhone");

const firstNameSchema = (field = "firstName") => {
  return {
    type: String,
    required: [true, FIELD_CANNOT_BE_EMPTY(field)],
    minLength: [
      MIN_NAME_LENGTH,
      FIELD_CANNOT_BE_SHORTER(field, MIN_NAME_LENGTH),
    ],
    maxLength: [
      MAX_NAME_LENGTH,
      FIELD_CANNOT_BE_LONGER(field, MAX_NAME_LENGTH),
    ],
    validate: [validator.isAlpha, FIELD_IS_NOT_OF_PROPER_FORMAT(field)],
  };
};

const lastNameSchema = (field = "lastName") => {
  return {
    type: String,
    minLength: [
      MIN_NAME_LENGTH,
      FIELD_CANNOT_BE_SHORTER(field, MIN_NAME_LENGTH),
    ],
    maxLength: [
      MAX_NAME_LENGTH,
      FIELD_CANNOT_BE_LONGER(field, MAX_NAME_LENGTH),
    ],
    validate: [validator.isAlpha, FIELD_IS_NOT_OF_PROPER_FORMAT(field)],
  };
};

const phoneSchema = (field = "phone") => {
  return {
    type: String,
    unique: true,
    validate: [isValidPhone, FIELD_IS_NOT_OF_PROPER_FORMAT(field)],
  };
};

const emailSchema = (field = "email") => {
  return {
    type: String,
    lowercase: true,
    validate: [validator.isEmail, FIELD_IS_NOT_OF_PROPER_FORMAT(field)],
  };
};

const passwordSchema = (field = "password") => {
  return {
    type: String,
    required: [true, FIELD_CANNOT_BE_EMPTY(field)],
    minLength: [
      MIN_PASSWORD_LENGTH,
      FIELD_CANNOT_BE_SHORTER(field, MIN_PASSWORD_LENGTH),
    ],
    maxLength: [
      MAX_PASSWORD_LENGTH,
      FIELD_CANNOT_BE_LONGER(field, MAX_PASSWORD_LENGTH),
    ],
    select: false,
  };
};

module.exports = {
  firstNameSchema,
  lastNameSchema,
  phoneSchema,
  emailSchema,
  passwordSchema,
};

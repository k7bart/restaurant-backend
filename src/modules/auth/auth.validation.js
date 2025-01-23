const {
  lengths: { MAX_NAME_LENGTH, MIN_NAME_LENGTH, MIN_PASSWORD_LENGTH },
} = require("../../consts/validation");

const { isValidPhoneNumber } = require("libphonenumber-js");

const {
  FIELD_CANNOT_BE_EMPTY,
  FIELD_CANNOT_BE_SHORTER,
  FIELD_IS_NOT_OF_PROPER_FORMAT,
} = require("../../consts/errors");

const email = {
  in: ["body"],
  notEmpty: {
    errorMessage: FIELD_CANNOT_BE_EMPTY("email"),
    bail: true,
  },
  isEmail: {
    errorMessage: FIELD_IS_NOT_OF_PROPER_FORMAT("email"),
    bail: true,
  },
  isLowercase: {
    errorMessage: "Email must be in lowercase.",
    bail: true,
  },
};

const password = {
  in: ["body"],
  isString: true,
  notEmpty: {
    errorMessage: FIELD_CANNOT_BE_EMPTY("password"),
    bail: true,
  },
  isLength: {
    options: { min: MIN_PASSWORD_LENGTH },
    errorMessage: FIELD_CANNOT_BE_SHORTER("password", MIN_PASSWORD_LENGTH),
  },
};

const loginSchema = {
  email,

  password,
};

const signupSchema = {
  firstName: {
    in: ["body"],
    isString: true,
    notEmpty: {
      errorMessage: FIELD_CANNOT_BE_EMPTY("firstName"),
      bail: true,
    },
    isLength: {
      options: { min: MIN_NAME_LENGTH, max: MAX_NAME_LENGTH },
      errorMessage: `First name must be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} characters.`,
      bail: true,
    },
    isAlpha: {
      errorMessage: FIELD_IS_NOT_OF_PROPER_FORMAT("firstName"),
      bail: true,
    },
  },

  lastName: {
    in: ["body"],
    isString: true,
    notEmpty: {
      errorMessage: FIELD_CANNOT_BE_EMPTY("firstName"),
      bail: true,
    },
    isLength: {
      options: { min: MIN_NAME_LENGTH, max: MAX_NAME_LENGTH },
      errorMessage: `First name must be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} characters.`,
      bail: true,
    },
    isAlpha: {
      errorMessage: FIELD_IS_NOT_OF_PROPER_FORMAT("firstName"),
      bail: true,
    },
  },

  phone: {
    in: ["body"],
    isString: true,
    custom: {
      options: (value) => isValidPhoneNumber(value),
      errorMessage: FIELD_IS_NOT_OF_PROPER_FORMAT("phone"),
    },
  },

  email,

  password,
};

module.exports = {
  loginSchema,
  signupSchema,
};

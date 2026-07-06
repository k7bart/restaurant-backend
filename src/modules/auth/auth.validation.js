const {
  lengths: {
    MAX_NAME_LENGTH,
    MIN_NAME_LENGTH,
    MIN_PASSWORD_LENGTH,
    MAX_PASSWORD_LENGTH,
  },
} = require("../../consts/validation");

const {
  FIELD_CANNOT_BE_EMPTY,
  FIELD_IS_NOT_OF_PROPER_FORMAT,
} = require("../../consts/errors");

const { normalizePhone, isValidPhone } = require("../../utils/normalizePhone");

const phoneValidation = {
  in: ["body"],
  isString: true,
  trim: true,
  notEmpty: {
    errorMessage: FIELD_CANNOT_BE_EMPTY("phone"),
    bail: true,
  },
  customSanitizer: {
    options: (value) => normalizePhone(value),
  },
  custom: {
    options: (value) => isValidPhone(value),
    errorMessage: FIELD_IS_NOT_OF_PROPER_FORMAT("phone"),
  },
};

const optionalEmail = {
  in: ["body"],
  optional: { options: { values: "falsy" } },
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
    options: { min: MIN_PASSWORD_LENGTH, max: MAX_PASSWORD_LENGTH },
    errorMessage: `Password must be between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH} characters.`,
  },
  matches: {
    options: /^(?=.*[A-Za-z])(?=.*\d).+$/,
    errorMessage: "Password must contain at least one letter and one number.",
  },
};

const loginSchema = {
  phone: phoneValidation,
  password,
  rememberMe: {
    in: ["body"],
    optional: true,
    isBoolean: true,
  },
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
    optional: { options: { values: "falsy" } },
    isLength: {
      options: { min: MIN_NAME_LENGTH, max: MAX_NAME_LENGTH },
      errorMessage: `Last name must be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} characters.`,
      bail: true,
    },
    isAlpha: {
      errorMessage: FIELD_IS_NOT_OF_PROPER_FORMAT("lastName"),
      bail: true,
    },
  },

  phone: phoneValidation,

  email: optionalEmail,
  password,

  rememberMe: {
    in: ["body"],
    optional: true,
    isBoolean: true,
  },
};

const optionalPhoneValidation = {
  in: ["body"],
  optional: true,
  isString: true,
  trim: true,
  notEmpty: {
    errorMessage: FIELD_CANNOT_BE_EMPTY("phone"),
    bail: true,
  },
  customSanitizer: {
    options: (value) => normalizePhone(value),
  },
  custom: {
    options: (value) => isValidPhone(value),
    errorMessage: FIELD_IS_NOT_OF_PROPER_FORMAT("phone"),
  },
};

const updateProfileSchema = {
  firstName: {
    in: ["body"],
    optional: true,
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
    optional: { options: { values: "falsy" } },
    isLength: {
      options: { min: MIN_NAME_LENGTH, max: MAX_NAME_LENGTH },
      errorMessage: `Last name must be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} characters.`,
      bail: true,
    },
    isAlpha: {
      errorMessage: FIELD_IS_NOT_OF_PROPER_FORMAT("lastName"),
      bail: true,
    },
  },

  phone: optionalPhoneValidation,

  email: optionalEmail,
};

module.exports = {
  loginSchema,
  signupSchema,
  updateProfileSchema,
};

const {
  lengths: { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH },
} = require("../../consts/validation");
const { FIELD_CANNOT_BE_EMPTY } = require("../../consts/errors");
const {
  phoneValidation,
  emailValidation,
  firstNameValidation,
  lastNameValidation,
} = require("../../utils/validationChains");

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
  phone: phoneValidation(),
  password,
  rememberMe: {
    in: ["body"],
    optional: true,
    isBoolean: true,
  },
};

const signupSchema = {
  firstName: firstNameValidation(),
  lastName: lastNameValidation(),
  phone: phoneValidation(),
  email: emailValidation(),
  password,
  rememberMe: {
    in: ["body"],
    optional: true,
    isBoolean: true,
  },
};

const updateProfileSchema = {
  firstName: firstNameValidation("firstName", true),
  lastName: lastNameValidation(),
  phone: phoneValidation("phone", true),
  email: emailValidation(),
};

module.exports = {
  loginSchema,
  signupSchema,
  updateProfileSchema,
};

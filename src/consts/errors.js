const errors = {
  ALREADY_REGISTERED: {
    code: "ALREADY_REGISTERED",
    message: "User with the specified email already exists.",
  },

  BAD_REQUEST: {
    code: "BAD_REQUEST",
    message:
      "The request could not be processed due to invalid or missing parameters.",
  },
  FORBIDDEN: {
    code: "FORBIDDEN",
    message: "You do not have permission to perform this action.",
  },
  INTERNAL_SERVER_ERROR: {
    code: "INTERNAL_SERVER_ERROR",
  },
  INVALID_ID: {
    code: "INVALID_ID",
    message: "ID is invalid.",
  },
  NOT_FOUND: {
    code: "NOT_FOUND",
    message: "The requested URL was not found.",
  },
  UNAUTHORIZED: {
    code: "UNAUTHORIZED",
    message: "The requested URL requires user authorization.",
  },

  FIELD_CANNOT_BE_EMPTY: (field) => `The ${field} field cannot be empty.`,

  FIELD_CANNOT_BE_LONGER: (field, quantity) =>
    `The ${field} cannot be longer than ${quantity} symbol.`,

  FIELD_CANNOT_BE_SHORTER: (field, quantity) =>
    `The ${field} cannot be shorter than ${quantity}.`,

  FIELD_IS_NOT_OF_PROPER_FORMAT: (field) => validationErrors[field],

  NAME_FIELD_IS_NOT_OF_PROPER_FORMAT: (field) => ({
    code: "NAME_NOT_VALID",
    message: `The ${field} can contain alphabetic characters only.`,
  }),
};

const validationErrors = {
  firstName: errors.NAME_FIELD_IS_NOT_OF_PROPER_FORMAT("firstName"),

  lastName: errors.NAME_FIELD_IS_NOT_OF_PROPER_FORMAT("lastName"),

  phone: {
    code: "PHONE_NOT_VAlID",
    message: "The phone number is not valid.",
  },

  email: {
    code: "EMAIL_NOT_VALID",
    message:
      "Email should be of the following format: “local-part@domain.com”.",
  },
};

module.exports = errors;

const errors = {
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
};

module.exports = errors;

const errors = {
  UNAUTHORIZED: {
    code: "UNAUTHORIZED",
    message: "The requested URL requires user authorization.",
  },
  NOT_FOUND: {
    code: "NOT_FOUND",
    message: "The requested URL was not found.",
  },
  FORBIDDEN: {
    code: "FORBIDDEN",
    message: "You do not have permission to perform this action.",
  },
  BAD_REQUEST: {
    code: "BAD_REQUEST",
    message:
      "The request could not be processed due to invalid or missing parameters.",
  },
  INTERNAL_SERVER_ERROR: {
    code: "INTERNAL_SERVER_ERROR",
  },
};

module.exports = errors;

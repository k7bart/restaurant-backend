const {
  lengths: { MAX_ADDITIONAL_REQUIREMENTS_LENGTH, MAX_GUESTS },
} = require("../../consts/validation");
const { FIELD_IS_NOT_OF_PROPER_FORMAT } = require("../../consts/errors");
const {
  phoneValidation,
  firstNameValidation,
  lastNameValidation,
  emailValidation,
} = require("../../utils/validationChains");

const createReservationSchema = {
  dateTime: {
    in: ["body"],
    isISO8601: {
      errorMessage: FIELD_IS_NOT_OF_PROPER_FORMAT("dateTime"),
      bail: true,
    },
    toDate: true,
    custom: {
      options: (value) => new Date(value) > new Date(),
      errorMessage: "Reservation date must be in the future.",
    },
  },
  "guests.adults": {
    in: ["body"],
    isInt: {
      options: { min: 1, max: MAX_GUESTS },
      errorMessage: FIELD_IS_NOT_OF_PROPER_FORMAT("guests.adults"),
      bail: true,
    },
    toInt: true,
  },
  "guests.children": {
    in: ["body"],
    optional: { options: { values: "falsy" } },
    isInt: {
      options: { min: 0, max: MAX_GUESTS },
      errorMessage: FIELD_IS_NOT_OF_PROPER_FORMAT("guests.children"),
      bail: true,
    },
    toInt: true,
  },
  "reservedBy.firstName": firstNameValidation("reservedBy.firstName"),
  "reservedBy.lastName": lastNameValidation("reservedBy.lastName"),
  "reservedBy.phone": phoneValidation("reservedBy.phone"),
  "reservedBy.email": emailValidation("reservedBy.email"),
  additionalRequirements: {
    in: ["body"],
    optional: { options: { values: "falsy" } },
    isString: true,
    trim: true,
    isLength: {
      options: { max: MAX_ADDITIONAL_REQUIREMENTS_LENGTH },
      errorMessage: `Additional requirements cannot be longer than ${MAX_ADDITIONAL_REQUIREMENTS_LENGTH} characters.`,
    },
  },
};

module.exports = {
  createReservationSchema,
};

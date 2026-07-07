const { Schema, model } = require("mongoose");
const validator = require("validator");
const { normalizePhone, isValidPhone } = require("../../utils/normalizePhone");
const {
  FIELD_CANNOT_BE_EMPTY,
  FIELD_CANNOT_BE_SHORTER,
  FIELD_CANNOT_BE_LONGER,
  FIELD_IS_NOT_OF_PROPER_FORMAT,
  FIELD_CANNOT_BE_HIGHER,
} = require("../../consts/errors");
const {
  lengths: {
    MAX_NAME_LENGTH,
    MIN_NAME_LENGTH,
    MAX_ADDITIONAL_REQUIREMENTS_LENGTH,
    MAX_GUESTS,
  },
} = require("../../consts/validation");

const guestsSchema = new Schema(
  {
    adults: {
      type: Number,
      required: [true, FIELD_CANNOT_BE_EMPTY("guests.adults")],
      min: [1, FIELD_CANNOT_BE_SHORTER("guests.adults", 1)],
      max: [MAX_GUESTS, FIELD_CANNOT_BE_HIGHER("guests.adults", MAX_GUESTS)],
    },
    children: {
      type: Number,
      min: [0, FIELD_CANNOT_BE_SHORTER("guests.children", 0)],
      max: [MAX_GUESTS, FIELD_CANNOT_BE_HIGHER("guests.children", MAX_GUESTS)],
    },
  },
  { _id: false },
);

const reservedBySchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, FIELD_CANNOT_BE_EMPTY("reservedBy.firstName")],
      minLength: [
        MIN_NAME_LENGTH,
        FIELD_CANNOT_BE_SHORTER("reservedBy.firstName", MIN_NAME_LENGTH),
      ],
      maxLength: [
        MAX_NAME_LENGTH,
        FIELD_CANNOT_BE_LONGER("reservedBy.firstName", MAX_NAME_LENGTH),
      ],
      validate: [validator.isAlpha, FIELD_IS_NOT_OF_PROPER_FORMAT("firstName")],
    },
    lastName: {
      type: String,
      minLength: [
        MIN_NAME_LENGTH,
        FIELD_CANNOT_BE_SHORTER("reservedBy.lastName", MIN_NAME_LENGTH),
      ],
      maxLength: [
        MAX_NAME_LENGTH,
        FIELD_CANNOT_BE_LONGER("reservedBy.lastName", MAX_NAME_LENGTH),
      ],
      validate: [validator.isAlpha, FIELD_IS_NOT_OF_PROPER_FORMAT("lastName")],
    },
    phone: {
      type: String,
      required: [true, FIELD_CANNOT_BE_EMPTY("reservedBy.phone")],
      validate: [isValidPhone, FIELD_IS_NOT_OF_PROPER_FORMAT("phone")],
    },
    email: {
      type: String,
      lowercase: true,
      validate: [validator.isEmail, FIELD_IS_NOT_OF_PROPER_FORMAT("email")],
    },
  },
  { _id: false },
);

const reservationSchema = new Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  dateTime: {
    type: Date,
    required: [true, FIELD_CANNOT_BE_EMPTY("dateTime")],
  },
  status: {
    type: String,
    enum: ["new", "confirmed", "cancelled"],
    default: "new",
  },
  guests: {
    type: guestsSchema,
    required: [true, FIELD_CANNOT_BE_EMPTY("guests")],
  },
  reservedBy: {
    type: reservedBySchema,
    required: [true, FIELD_CANNOT_BE_EMPTY("reservedBy")],
  },
  additionalRequirements: {
    type: String,
    maxLength: [
      MAX_ADDITIONAL_REQUIREMENTS_LENGTH,
      FIELD_CANNOT_BE_LONGER(
        "additionalRequirements",
        MAX_ADDITIONAL_REQUIREMENTS_LENGTH,
      ),
    ],
  },
});

reservationSchema.pre("save", function (next) {
  if (this.reservedBy?.phone) {
    this.reservedBy.phone = normalizePhone(this.reservedBy.phone);
  }

  next();
});

module.exports = model("Reservation", reservationSchema);

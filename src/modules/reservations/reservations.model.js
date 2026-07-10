const { Schema, model } = require("mongoose");
const { normalizePhone } = require("../../utils/normalizePhone");
const {
  FIELD_CANNOT_BE_EMPTY,
  FIELD_CANNOT_BE_SHORTER,
  FIELD_CANNOT_BE_LONGER,
  FIELD_CANNOT_BE_HIGHER,
} = require("../../consts/errors");
const {
  lengths: { MAX_COMMENT_LENGTH, MAX_GUESTS },
} = require("../../consts/validation");
const {
  firstNameSchema,
  lastNameSchema,
  phoneSchema,
  emailSchema,
} = require("../../utils/modelSchemas");

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
    firstName: firstNameSchema("reservedBy.firstName"),
    lastName: lastNameSchema("reservedBy.lastName"),
    phone: phoneSchema("reservedBy.phone"),
    email: emailSchema("reservedBy.email"),
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
      MAX_COMMENT_LENGTH,
      FIELD_CANNOT_BE_LONGER("additionalRequirements", MAX_COMMENT_LENGTH),
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

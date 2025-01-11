const { Schema, model } = require("mongoose");
const { isValidPhoneNumber } = require("libphonenumber-js");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const {
  FIELD_CANNOT_BE_EMPTY,
  FIELD_CANNOT_BE_SHORTER,
  FIELD_CANNOT_BE_LONGER,
  FIELD_IS_NOT_OF_PROPER_FORMAT,
} = require("../../consts/errors");

const {
  lengths: { MAX_NAME_LENGTH, MIN_NAME_LENGTH, MIN_PASSWORD_LENGTH },
} = require("../../consts/validation");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, FIELD_CANNOT_BE_EMPTY("first name")],
    minLength: [
      MIN_NAME_LENGTH,
      FIELD_CANNOT_BE_SHORTER("first name", MIN_NAME_LENGTH),
    ],
    maxLength: [
      MAX_NAME_LENGTH,
      FIELD_CANNOT_BE_LONGER("first name", MAX_NAME_LENGTH),
    ],
    validate: [validator.isAlpha, FIELD_IS_NOT_OF_PROPER_FORMAT("firstName")],
  },

  lastName: {
    type: String,
    minLength: [
      MIN_NAME_LENGTH,
      FIELD_CANNOT_BE_SHORTER("last name", MIN_NAME_LENGTH),
    ],
    maxLength: [
      MAX_NAME_LENGTH,
      FIELD_CANNOT_BE_LONGER("last name", MAX_NAME_LENGTH),
    ],
    validate: [validator.isAlpha, FIELD_IS_NOT_OF_PROPER_FORMAT("lastName")],
  },

  phone: {
    type: String,
    validate: [isValidPhoneNumber, FIELD_IS_NOT_OF_PROPER_FORMAT("phone")],
  },

  email: {
    type: String,
    required: [true, FIELD_CANNOT_BE_EMPTY("email")],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, FIELD_IS_NOT_OF_PROPER_FORMAT("email")],
  },

  password: {
    type: String,
    required: [true, FIELD_CANNOT_BE_EMPTY("password")],
    minLength: [
      MIN_PASSWORD_LENGTH,
      FIELD_CANNOT_BE_SHORTER("password", MIN_PASSWORD_LENGTH),
    ],
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.index({ email: 1 }, { unique: true }); // database-level uniqueness

module.exports = model("User", userSchema);

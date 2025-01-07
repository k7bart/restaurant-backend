const { Schema, model } = require("mongoose");
const { isValidPhoneNumber } = require("libphonenumber-js");
const validator = require("validator");

const {
  FIELD_CANNOT_BE_EMPTY,
  FIELD_CANNOT_BE_SHORTER,
  FIELD_CANNOT_BE_LONGER,
  FIELD_IS_NOT_OF_PROPER_FORMAT,
} = require("../../consts/errors");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, FIELD_CANNOT_BE_EMPTY("first name")],
    minLength: [1, FIELD_CANNOT_BE_SHORTER("first name", 1)],
    maxLength: [30, FIELD_CANNOT_BE_LONGER("first name", 30)],
    validate: [validator.isAlpha, FIELD_IS_NOT_OF_PROPER_FORMAT("firstName")],
  },

  lastName: {
    type: String,
    minLength: [1, FIELD_CANNOT_BE_SHORTER("last name", 1)],
    maxLength: [30, FIELD_CANNOT_BE_LONGER("last name", 30)],
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
    minLength: [8, FIELD_CANNOT_BE_SHORTER("password", 8)],
    select: false,
  },
});

userSchema.index({ email: 1 }, { unique: true }); // database-level uniqueness

module.exports = model("User", userSchema);

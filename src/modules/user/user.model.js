const { Schema, model } = require("mongoose");
const { isValidPhoneNumber } = require("libphonenumber-js");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { normalizePhone } = require("../../utils/normalizePhone");

const {
  FIELD_CANNOT_BE_EMPTY,
  FIELD_CANNOT_BE_SHORTER,
  FIELD_CANNOT_BE_LONGER,
  FIELD_IS_NOT_OF_PROPER_FORMAT,
} = require("../../consts/errors");

const {
  lengths: {
    MAX_NAME_LENGTH,
    MIN_NAME_LENGTH,
    MIN_PASSWORD_LENGTH,
    MAX_PASSWORD_LENGTH,
  },
} = require("../../consts/validation");

const userSchema = new Schema({
  id: {
    type: String,
    unique: true,
  },

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
  },

  phone: {
    type: String,
    unique: true,
    validate: [isValidPhoneNumber, FIELD_IS_NOT_OF_PROPER_FORMAT("phone")],
  },

  email: {
    type: String,
    lowercase: true,
    validate: [validator.isEmail, FIELD_IS_NOT_OF_PROPER_FORMAT("email")],
  },

  referralLink: {
    type: String,
  },

  referralPromoCode: {
    type: String,
  },

  password: {
    type: String,
    required: [true, FIELD_CANNOT_BE_EMPTY("password")],
    minLength: [
      MIN_PASSWORD_LENGTH,
      FIELD_CANNOT_BE_SHORTER("password", MIN_PASSWORD_LENGTH),
    ],
    maxLength: [
      MAX_PASSWORD_LENGTH,
      FIELD_CANNOT_BE_LONGER("password", MAX_PASSWORD_LENGTH),
    ],
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.id) {
    this.id = this._id.toString();
  }

  if (this.isModified("phone") && this.phone) {
    this.phone = normalizePhone(this.phone);
  }

  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.methods.comparePasswords = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = model("User", userSchema);

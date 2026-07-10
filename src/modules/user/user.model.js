const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const { normalizePhone } = require("../../utils/normalizePhone");

const {
  firstNameSchema,
  lastNameSchema,
  phoneSchema,
  emailSchema,
  passwordSchema,
} = require("../../utils/modelSchemas");

const userSchema = new Schema({
  id: {
    type: String,
    unique: true,
  },

  firstName: firstNameSchema(),

  lastName: lastNameSchema(),

  phone: phoneSchema(),

  email: emailSchema(),

  referralLink: {
    type: String,
  },

  referralPromoCode: {
    type: String,
  },

  password: passwordSchema(),
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

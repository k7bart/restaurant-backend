const {
  parsePhoneNumberFromString,
  isValidPhoneNumber,
} = require("libphonenumber-js");
const { DEFAULT_PHONE_COUNTRY } = require("../consts/validation");

const parsePhone = (phone) => {
  const trimmed = String(phone).trim();
  return parsePhoneNumberFromString(trimmed, DEFAULT_PHONE_COUNTRY);
};

const normalizePhone = (phone) => {
  if (!phone) {
    return phone;
  }

  const parsed = parsePhone(phone);

  if (!parsed || !parsed.isValid()) {
    return String(phone).trim();
  }

  return parsed.format("E.164");
};

const isValidPhone = (phone) => isValidPhoneNumber(phone, DEFAULT_PHONE_COUNTRY);

module.exports = { normalizePhone, isValidPhone };

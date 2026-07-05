const User = require("./user.model");
const { config } = require("../../config");
const { ALREADY_REGISTERED } = require("../../consts/errors");
const { createError } = require("../../utils/errorsHelpers");
const { normalizePhone } = require("../../utils/normalizePhone");

const throwIfDuplicatePhone = (err) => {
  if (err.code !== 11000) {
    throw err;
  }

  const duplicateField = Object.keys(err.keyPattern || {})[0];

  if (duplicateField === "phone") {
    throw createError(409, ALREADY_REGISTERED);
  }

  throw err;
};

const buildReferralData = (id) => {
  return {
    referralLink: `${config.CLIENT_URL}/signup?ref=${id}`,
    referralPromoCode: id,
  };
};

const formatUser = (user) => ({
  id: user.id ?? user._id?.toString(),
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  phone: user.phone,
  referralLink: user.referralLink,
  referralPromoCode: user.referralPromoCode,
});

const userService = {
  createUser: async (firstName, lastName, phone, email, password) => {
    const normalizedPhone = normalizePhone(phone);

    const duplicateUser = await userService.getUserByPhone(normalizedPhone);

    if (duplicateUser) {
      throw createError(409, ALREADY_REGISTERED);
    }

    try {
      const user = new User({
        firstName,
        ...(lastName && { lastName }),
        phone: normalizedPhone,
        ...(email && { email }),
        password,
      });

      Object.assign(user, buildReferralData(user._id.toString()));

      await user.save();

      return user;
    } catch (err) {
      throwIfDuplicatePhone(err);
    }
  },

  getUserByPhone: async (phone) => {
    const normalizedPhone = normalizePhone(phone);

    if (!normalizedPhone) {
      return null;
    }

    const user = await User.findOne({ phone: normalizedPhone }).lean();

    return user || null;
  },

  getUserByPhoneWithPassword: async (phone) => {
    const normalizedPhone = normalizePhone(phone);

    if (!normalizedPhone) {
      return null;
    }

    const user = await User.findOne({ phone: normalizedPhone }).select(
      "+password",
    );

    return user || null;
  },

  getUserById: async (id) => {
    const user = await User.findById(id).lean();

    return user || null;
  },

  updateUserProfile: async (userId, { firstName, lastName, phone, email }) => {
    const user = await User.findById(userId);

    if (!user) {
      return null;
    }

    if (phone !== undefined) {
      const normalizedPhone = normalizePhone(phone);

      if (normalizedPhone !== user.phone) {
        const duplicateUser = await userService.getUserByPhone(normalizedPhone);

        if (duplicateUser) {
          throw createError(409, ALREADY_REGISTERED);
        }
      }

      user.phone = normalizedPhone;
    }

    if (firstName !== undefined) {
      user.firstName = firstName;
    }

    if (lastName !== undefined) {
      user.lastName = lastName || undefined;
    }

    if (email !== undefined) {
      user.email = email || undefined;
    }

    try {
      await user.save();
    } catch (err) {
      throwIfDuplicatePhone(err);
    }

    return user.toObject();
  },
};

module.exports = userService;
module.exports.formatUser = formatUser;

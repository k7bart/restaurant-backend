const User = require("./user.model");
const { ALREADY_REGISTERED } = require("../../consts/errors");

const userService = {
  createUser: async (firstName, lastName, phone, email, password) => {
    const duplicateUser = await userService.getUserByEmail(email);

    if (duplicateUser) {
      throw createError(409, ALREADY_REGISTERED);
    }

    return await User.create({
      firstName,
      lastName,
      phone,
      email,
      password,
    });
  },

  getUserByEmail: async (email) => {
    const user = await User.findOne({ email }).lean();

    return user || null;
  },
};

module.exports = userService;

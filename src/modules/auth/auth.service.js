const tokenService = require("../token/token.service");
const userService = require("../user/user.service");

const { createError } = require("../../utils/errorsHelpers");

const { INCORRECT_CREDENTIALS } = require("../../consts/errors");

const authService = {
  login: async (email, password) => {
    const user = await userService.getUserByEmailWithPassword(email);

    if (!user || !(await user.comparePasswords(password, user.password))) {
      throw createError(401, INCORRECT_CREDENTIALS);
    }

    const tokens = tokenService.generateTokens({
      id: user._id,
    });

    return tokens;
  },

  signup: async (firstName, lastName, phone, email, password) => {
    const user = await userService.createUser(
      firstName,
      lastName,
      phone,
      email,
      password
    );

    const tokens = tokenService.generateTokens({ id: user._id });

    return {
      userId: user._id,
      userEmail: user.email,
      tokens,
    };
  },
};

module.exports = authService;

const tokenService = require("../token/token.service");
const refreshTokenService = require("../token/refreshToken.service");
const userService = require("../user/user.service");

const { config } = require("../../config");

const {
  createError,
  createUnauthorizedError,
} = require("../../utils/errorsHelpers");

const { INCORRECT_CREDENTIALS } = require("../../consts/errors");

const persistRefreshToken = async (userId, jti) => {
  const expiresAt = new Date(Date.now() + config.JWT_REFRESH_MAX_AGE_MS);
  await refreshTokenService.create(userId, jti, expiresAt);
};

const authService = {
  login: async (phone, password) => {
    const user = await userService.getUserByPhoneWithPassword(phone);

    if (!user || !(await user.comparePasswords(password, user.password))) {
      throw createError(401, INCORRECT_CREDENTIALS);
    }

    const tokens = tokenService.generateTokens({ id: user.id });

    await persistRefreshToken(user._id, tokens.jti);

    return {
      user: userService.formatUser(user),
      tokens,
    };
  },

  signup: async (firstName, lastName, phone, email, password) => {
    const user = await userService.createUser(
      firstName,
      lastName,
      phone,
      email,
      password,
    );

    const tokens = tokenService.generateTokens({ id: user.id });

    await persistRefreshToken(user._id, tokens.jti);

    return {
      user: userService.formatUser(user),
      tokens,
    };
  },

  refresh: async (refreshToken) => {
    if (!refreshToken) {
      throw createUnauthorizedError();
    }

    let payload;

    try {
      payload = tokenService.verifyRefreshToken(refreshToken);
    } catch {
      throw createUnauthorizedError();
    }

    const storedToken = await refreshTokenService.findByJti(payload.jti);

    if (!storedToken) {
      await refreshTokenService.deleteAllForUser(payload.id);
      throw createUnauthorizedError();
    }

    await refreshTokenService.deleteByJti(payload.jti);

    const tokens = tokenService.generateTokens({ id: payload.id });

    await persistRefreshToken(payload.id, tokens.jti);

    return tokens;
  },

  logout: async (refreshToken) => {
    if (!refreshToken) {
      return;
    }

    try {
      const payload = tokenService.verifyRefreshToken(refreshToken);
      await refreshTokenService.deleteByJti(payload.jti);
    } catch {
      return;
    }
  },

  getMe: async (userId) => {
    const user = await userService.getUserById(userId);

    if (!user) {
      throw createUnauthorizedError();
    }

    return userService.formatUser(user);
  },

  updateMe: async (userId, { firstName, lastName, phone, email }) => {
    const user = await userService.updateUserProfile(userId, {
      firstName,
      lastName,
      phone,
      email,
    });

    if (!user) {
      throw createUnauthorizedError();
    }

    return userService.formatUser(user);
  },
};

module.exports = authService;

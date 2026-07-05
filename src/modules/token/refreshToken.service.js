const RefreshToken = require("./refreshToken.model");

const refreshTokenService = {
  create: async (userId, jti, expiresAt) => {
    return RefreshToken.create({ userId, jti, expiresAt });
  },

  findByJti: async (jti) => {
    return RefreshToken.findOne({ jti });
  },

  deleteByJti: async (jti) => {
    return RefreshToken.deleteOne({ jti });
  },

  deleteAllForUser: async (userId) => {
    return RefreshToken.deleteMany({ userId });
  },
};

module.exports = refreshTokenService;

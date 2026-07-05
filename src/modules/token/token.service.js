const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const {
  JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN,
} = require("../../config").config;

const tokenService = {
  generateTokens: (payload) => {
    const jti = crypto.randomUUID();

    const accessToken = jwt.sign({ id: payload.id }, JWT_ACCESS_SECRET, {
      expiresIn: JWT_ACCESS_EXPIRES_IN,
    });

    const refreshToken = jwt.sign(
      { id: payload.id, jti },
      JWT_REFRESH_SECRET,
      { expiresIn: JWT_REFRESH_EXPIRES_IN },
    );

    return {
      accessToken,
      refreshToken,
      jti,
    };
  },

  verifyAccessToken: (token) => {
    return jwt.verify(token, JWT_ACCESS_SECRET);
  },

  verifyRefreshToken: (token) => {
    return jwt.verify(token, JWT_REFRESH_SECRET);
  },
};

module.exports = tokenService;

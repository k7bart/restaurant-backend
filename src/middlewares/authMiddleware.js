const tokenService = require("../modules/token/token.service");
const userService = require("../modules/user/user.service");
const { createUnauthorizedError } = require("../utils/errorsHelpers");

const authMiddleware = async (req, _res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) return next(createUnauthorizedError());

    const payload = tokenService.verifyAccessToken(accessToken);
    const user = await userService.getUserById(payload.id);

    if (!user) return next(createUnauthorizedError());

    req.user = {
      id: user.id,
      email: user.email,
    };

    next();
  } catch {
    next(createUnauthorizedError());
  }
};

module.exports = { authMiddleware };

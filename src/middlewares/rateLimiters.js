const rateLimit = require("express-rate-limit");
const { createTooManyRequestsError } = require("../utils/errorsHelpers");

const rateLimitHandler = (_req, _res, next) => {
  return next(createTooManyRequestsError());
};

const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
});

const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
});

module.exports = { globalRateLimiter, authRateLimiter };

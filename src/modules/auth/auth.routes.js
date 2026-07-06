const router = require("express").Router();
const validationMiddleware = require("../../middlewares/validationMiddleware");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const { authRateLimiter } = require("../../middlewares/rateLimiters");
const authController = require("./auth.controller");
const {
  loginSchema,
  signupSchema,
  updateProfileSchema,
} = require("./auth.validation");

router.post(
  "/login",
  authRateLimiter,
  validationMiddleware(loginSchema),
  authController.login,
);

router.post(
  "/signup",
  authRateLimiter,
  validationMiddleware(signupSchema),
  authController.signup,
);

router.post("/refresh", authRateLimiter, authController.refresh);

router.post("/logout", authController.logout);

router.get("/me", authMiddleware, authController.getMe);

router.patch(
  "/me",
  authMiddleware,
  validationMiddleware(updateProfileSchema),
  authController.updateMe,
);

module.exports = router;

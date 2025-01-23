const router = require("express").Router();
const validationMiddleware = require("../../middlewares/validationMiddleware");
const authController = require("./auth.controller");
const { loginSchema, signupSchema } = require("./auth.validation");

router.post("/login", validationMiddleware(loginSchema), authController.login);

router.post(
  "/signup",
  validationMiddleware(signupSchema),
  authController.signup
);

module.exports = router;

const authService = require("./auth.service");

const COOKIE_OPTIONS = {
  httpOnly: true,
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const { accessToken, refreshToken } = await authService.login(
    email,
    password
  );

  res.cookie("accessToken", accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: 15 * 60 * 1000,
  }); // 15 min
  res.cookie("refreshToken", refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  }); // 7 days

  return res.status(200).json({ message: "Login successful" });
};

const signup = async (req, res) => {
  const { firstName, lastName, phone, email, password } = req.body;

  const userData = await authService.signup(
    firstName,
    lastName,
    phone,
    email,
    password
  );

  res.status(201).json(userData);
};

module.exports = {
  login,
  signup,
};

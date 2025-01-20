const authService = require("./auth.service");

const COOKIE_OPTIONS = {
  httpOnly: true,
};

const setTokensAsCookies = (res, tokens) => {
  const { accessToken, refreshToken } = tokens;

  res.cookie("accessToken", accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: 15 * 60 * 1000, // 15 min
  });
  res.cookie("refreshToken", refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const tokens = await authService.login(email, password);

  setTokensAsCookies(res, tokens);

  return res.status(200).json({ message: "Login successful" });
};

const signup = async (req, res) => {
  const { firstName, lastName, phone, email, password } = req.body;

  const { userId, userEmail, tokens } = await authService.signup(
    firstName,
    lastName,
    phone,
    email,
    password
  );

  setTokensAsCookies(res, tokens);

  res.status(201).json({
    status: "success",
    message: "User registered and authenticated successfully",
    data: { userId, userEmail },
  });
};

module.exports = {
  login,
  signup,
};

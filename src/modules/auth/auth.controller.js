const authService = require("./auth.service");
const { config } = require("../../config");

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: config.IS_PRODUCTION,
  sameSite: config.IS_PRODUCTION ? "none" : "strict",
  path: "/",
};

const setTokensAsCookies = (res, tokens, { rememberMe = true } = {}) => {
  res.cookie("accessToken", tokens.accessToken, {
    ...COOKIE_OPTIONS,
    ...(rememberMe && { maxAge: config.JWT_ACCESS_MAX_AGE_MS }),
  });
  res.cookie("refreshToken", tokens.refreshToken, {
    ...COOKIE_OPTIONS,
    ...(rememberMe && { maxAge: config.JWT_REFRESH_MAX_AGE_MS }),
  });
};

const clearTokenCookies = (res) => {
  res.clearCookie("accessToken", COOKIE_OPTIONS);
  res.clearCookie("refreshToken", COOKIE_OPTIONS);
};

const login = async (req, res) => {
  const { phone, password, rememberMe } = req.body;

  const { user, tokens } = await authService.login(phone, password);

  setTokensAsCookies(res, tokens, { rememberMe });

  return res.status(200).json({
    status: "success",
    message: "Login successful",
    data: user,
  });
};

const signup = async (req, res) => {
  const { firstName, lastName, phone, email, password, rememberMe } = req.body;

  const { user, tokens } = await authService.signup(
    firstName,
    lastName,
    phone,
    email,
    password,
  );

  setTokensAsCookies(res, tokens, { rememberMe });

  res.status(201).json({
    status: "success",
    message: "User registered and authenticated successfully",
    data: user,
  });
};

const refresh = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  const tokens = await authService.refresh(refreshToken);

  setTokensAsCookies(res, tokens);

  return res.status(200).json({
    status: "success",
    message: "Token refreshed successfully",
  });
};

const logout = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  await authService.logout(refreshToken);

  clearTokenCookies(res);

  return res.status(200).json({
    status: "success",
    message: "Logout successful",
  });
};

const getMe = async (req, res) => {
  const user = await authService.getMe(req.user.id);

  return res.status(200).json({
    status: "success",
    data: user,
  });
};

const updateMe = async (req, res) => {
  const { firstName, lastName, phone, email } = req.body;

  const user = await authService.updateMe(req.user.id, {
    firstName,
    lastName,
    phone,
    email,
  });

  return res.status(200).json({
    status: "success",
    data: user,
  });
};

module.exports = {
  login,
  signup,
  refresh,
  logout,
  getMe,
  updateMe,
};

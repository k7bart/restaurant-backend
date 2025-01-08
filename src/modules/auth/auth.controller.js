const authService = require("./auth.service");

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
  signup,
};

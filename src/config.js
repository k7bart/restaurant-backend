const config = {
  MONGODB_URL: process.env.MONGODB_URL,
  MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,

  CLIENT_URL: process.env.CLIENT_URL,
  SERVER_URL: process.env.SERVER_URL,
  SERVER_PORT: process.env.SERVER_PORT,
};

module.exports = { config };

const REQUIRED_ENV_VARIABLES = [
  "MONGODB_URL",
  "MONGODB_PASSWORD",
  "JWT_ACCESS_SECRET",
  "JWT_ACCESS_EXPIRES_IN",
  "JWT_REFRESH_SECRET",
  "JWT_REFRESH_EXPIRES_IN",
  "CLIENT_URL",
  "SERVER_PORT",
];

const validateEnv = () => {
  const missing = REQUIRED_ENV_VARIABLES.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`,
    );
  }

  if (process.env.JWT_ACCESS_SECRET.length < 32) {
    throw new Error("JWT_ACCESS_SECRET must be at least 32 characters");
  }

  if (process.env.JWT_REFRESH_SECRET.length < 32) {
    throw new Error("JWT_REFRESH_SECRET must be at least 32 characters");
  }
};

module.exports = { validateEnv };

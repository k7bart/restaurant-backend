const cors = require("cors");
const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const { CLIENT_URL } = require("../config").config;
const { globalRateLimiter } = require("../middlewares/rateLimiters");
const errorHandler = require("../middlewares/errorHandler");

const router = require("../router");

const initialization = (app) => {
  app.set("trust proxy", 1);

  app.use(helmet());
  app.use(globalRateLimiter);
  app.use(express.json({ limit: "10kb" }));
  app.use(cookieParser());
  app.use(compression());
  app.use(
    cors({
      origin: CLIENT_URL,
      credentials: true,
    }),
  );

  app.use("/", router);
  app.use(errorHandler);
};

module.exports = initialization;

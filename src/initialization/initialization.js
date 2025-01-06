const cors = require("cors");

const { CLIENT_URL } = require("../config").config;

const router = require("../router");

const initialization = (app) => {
  app.use(
    cors({
      origin: CLIENT_URL,
    })
  );

  app.use("/", router);
};

module.exports = initialization;

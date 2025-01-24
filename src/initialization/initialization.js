const cors = require("cors");
const express = require("express");

const { CLIENT_URL } = require("../config").config;

const router = require("../router");

const initialization = (app) => {
  app.use(express.json());
  app.use(
    cors({
      origin: CLIENT_URL,
    })
  );

  app.use("/", router);
};

module.exports = initialization;

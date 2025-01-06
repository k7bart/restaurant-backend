const express = require("express");

const app = express();

const serverSetup = require("./src/initialization/serverSetup");

const start = async () => {
  try {
    await serverSetup(app);
  } catch (err) {
    console.log(err);
  }
};

start();

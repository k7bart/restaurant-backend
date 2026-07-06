const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

const initialization = require("./initialization");
const syncModelIndexes = require("./syncModelIndexes");

const {
  config: { MONGODB_URL, MONGODB_PASSWORD, SERVER_PORT },
} = require("../config");

const databaseInitialization = async () => {
  const DB = MONGODB_URL.replace("<PASSWORD>", MONGODB_PASSWORD);

  await mongoose.connect(DB, { autoIndex: false });
  console.log("DB connection successful!");

  await syncModelIndexes();
};

const serverSetup = async (app) => {
  await databaseInitialization();
  initialization(app);
  return app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
  });
};

module.exports = serverSetup;

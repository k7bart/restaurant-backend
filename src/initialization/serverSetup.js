const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

const initialization = require("./initialization");

const {
  config: { MONGODB_URL, MONGODB_PASSWORD, SERVER_PORT },
} = require("../config");

const databaseInitialization = async () => {
  const DB = MONGODB_URL.replace("<PASSWORD>", MONGODB_PASSWORD);

  await mongoose
    .connect(DB)
    .then(() => console.log("DB connection successful!"))
    .catch((err) => console.error("DB connection error:", err));
};

const serverSetup = async (app) => {
  await databaseInitialization();
  initialization(app);
  return app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
  });
};

module.exports = serverSetup;

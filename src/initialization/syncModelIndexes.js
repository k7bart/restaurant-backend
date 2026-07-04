const Event = require("../modules/events/events.model");
const RefreshToken = require("../modules/token/refreshToken.model");
const User = require("../modules/user/user.model");

const MODELS = [User, RefreshToken, Event];

const syncModelIndexes = async () => {
  for (const model of MODELS) {
    try {
      await model.syncIndexes();
      console.log(`${model.modelName} indexes synced`);
    } catch (err) {
      throw new Error(`${model.modelName} index sync failed: ${err.message}`);
    }
  }
};

module.exports = syncModelIndexes;

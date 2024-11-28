const router = require("express").Router();

const events = require("./modules/events/events.routes");

router.use("/events", events);

module.exports = router;

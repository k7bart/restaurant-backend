const router = require("express").Router();

const auth = require("./modules/auth/auth.routes");
const events = require("./modules/events/events.routes");

router.use("/auth", auth);
router.use("/events", events);

module.exports = router;

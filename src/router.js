const router = require("express").Router();
const { createNotFoundError } = require("./utils/errorsHelpers");

const auth = require("./modules/auth/auth.routes");
const events = require("./modules/events/events.routes");
const reservations = require("./modules/reservations/reservations.routes");

router.use("/auth", auth);
router.use("/events", events);
router.use("/reservations", reservations);

router.use((_req, _res, next) => next(createNotFoundError()));

module.exports = router;

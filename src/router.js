const router = require("express").Router();

const auth = require("./modules/auth/auth.routes");
const events = require("./modules/events/events.routes");

router.use("/auth", auth);
router.use("/events", events);

router.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

module.exports = router;

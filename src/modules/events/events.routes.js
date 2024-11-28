const router = require("express").Router();
const { validateIdChain } = require("../../utils/validationChains");
const eventsController = require("./events.controller");

router.get("/", eventsController.getEvents);
router.get("/id/:id", validateIdChain(), eventsController.getEventById);
router.get("/name/:name", eventsController.getEventByName);

module.exports = router;

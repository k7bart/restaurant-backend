const router = require("express").Router();
const validationMiddleware = require("../../middlewares/validationMiddleware");
const reservationsController = require("./reservations.controller");
const { createReservationSchema } = require("./reservations.validation");

router.post(
  "/",
  validationMiddleware(createReservationSchema),
  reservationsController.createReservation,
);

module.exports = router;

const router = require("express").Router();
const validationMiddleware = require("../../middlewares/validationMiddleware");
const ordersController = require("./orders.controller");
const { createOrderSchema } = require("./orders.validation");

router.post(
  "/",
  validationMiddleware(createOrderSchema),
  ordersController.createOrder,
);

module.exports = router;

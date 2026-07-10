const ordersService = require("./orders.service");

const createOrder = async (req, res) => {
  const order = await ordersService.createOrder(req.body);

  res.status(201).json({
    status: "success",
    message: "Order created successfully",
    data: order,
  });
};

module.exports = {
  createOrder,
};

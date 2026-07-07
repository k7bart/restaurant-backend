const reservationsService = require("./reservations.service");

const createReservation = async (req, res) => {
  const reservation = await reservationsService.createReservation(req.body);

  res.status(201).json({
    status: "success",
    message: "Reservation created successfully",
    data: reservation,
  });
};

module.exports = {
  createReservation,
};

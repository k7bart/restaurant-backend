const { getNextSequence } = require("../counter/counter.service");
const Reservation = require("./reservations.model");

const reservationsService = {
  createReservation: async ({
    dateTime,
    guests,
    reservedBy,
    additionalRequirements,
  }) => {
    const id = await getNextSequence("reservation");

    const reservation = await Reservation.create({
      id,
      dateTime,
      guests,
      reservedBy,
      status: "new",
      ...(additionalRequirements && { additionalRequirements }),
    });

    return reservation.toObject();
  },
};

module.exports = reservationsService;

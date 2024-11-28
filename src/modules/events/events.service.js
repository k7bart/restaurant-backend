const Event = require("./events.model");

const eventsService = {
  getEvents: async () => {
    return Event.find();
  },

  getEventById: async (eventId) => {
    const event = await Event.findById(eventId);

    if (!event) {
      throw createNotFoundError();
    }

    return event;
  },

  getEventByName: async (eventName) => {
    const event = await Event.find({ name: eventName });

    return event;
  },
};

module.exports = eventsService;

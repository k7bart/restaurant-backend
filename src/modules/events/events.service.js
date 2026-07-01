const Event = require("./events.model");
const { createNotFoundError } = require("../../utils/errorsHelpers");

const normalizeEvent = ({ name, pathName, ...event }) => ({
  ...event,
  pathName: pathName ?? name,
});

const eventsService = {
  getEvents: async () => {
    const events = await Event.find().lean();

    return events.map(normalizeEvent);
  },

  getEventById: async (eventId) => {
    const event = await Event.findById(eventId).lean();

    if (!event) {
      throw createNotFoundError();
    }

    return normalizeEvent(event);
  },

  getEventByPathName: async (pathName) => {
    const event = await Event.findOne({
      $or: [{ pathName }, { name: pathName }],
    }).lean();

    if (!event) {
      throw createNotFoundError();
    }

    return normalizeEvent(event);
  },
};

module.exports = eventsService;

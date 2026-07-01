const eventsService = require("./events.service");

const getEvents = async (_req, res) => {
  const events = await eventsService.getEvents();

  res.status(200).json(events);
};

const getEventById = async (req, res) => {
  const { id } = req.params;
  const event = await eventsService.getEventById(id);

  res.status(200).json(event);
};

const getEventByPathName = async (req, res) => {
  const { pathName } = req.params;
  const event = await eventsService.getEventByPathName(pathName);

  res.status(200).json(event);
};

module.exports = {
  getEvents,
  getEventById,
  getEventByPathName,
};

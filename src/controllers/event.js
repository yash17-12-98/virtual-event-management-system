const Event = require("../models/event");
const Validator = require("../helpers/validators");
const Participant = require("../models/participant");

const getEvents = async (req, res) => {
  const allEvents = await Event.find({});

  return res
    .status(200)
    .json({ status: "success", count: allEvents.length, message: allEvents });
};

const updateEvents = async (req, res) => {
  try {
    const eventId = req.params.id;
    const updateEventRequest = req.body;

    if (!Validator.validateEventInfo(updateEventRequest).status) {
      return res.status(404).json({
        status: "error",
        message: Validator.validateEventInfo(updateEventRequest).message,
      });
    }

    const event = await Event.findByIdAndUpdate(eventId, updateEventRequest, {
      new: true,
    });

    if (!event) {
      return res.status(400).json({
        status: "error",
        message: "Event not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Event updated successfully",
      data: {
        name: event.name,
        description: event.description,
        date: event.eventDate,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message || "Internel server error",
    });
  }
};

const createEvents = async (req, res) => {
  try {
    const eventRequest = req.body;

    if (!Validator.validateEventInfo(eventRequest).status) {
      return res.status(400).json({
        status: "error",
        message: Validator.validateEventInfo(eventRequest).message,
      });
    }

    const newEvent = Event({
      name: eventRequest.name,
      description: eventRequest.description,
      eventDate: eventRequest.eventDate,
    });

    const saveEvent = await newEvent.save();

    return res.status(200).json({
      status: "success",
      message: "Event created successfully",
      data: {
        name: saveEvent.name,
        date: saveEvent.eventDate,
      },
    });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

const deleteEvents = async (req, res) => {
  try {
    const eventId = req.params.id;

    await Event.findByIdAndDelete(eventId);

    return res.status(200).json({
      status: "success",
      message: "Event deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message || "Internel server error",
    });
  }
};
const registerEventByUser = async (req, res) => {
  console.log("register");
  const eventId = req.params.id;
  console.log("eventId ", eventId);
  const userRequest = req.body;
  const event = await Event.findById({ _id: eventId });

  console.log("Event =>", event);

  if (!event) {
    return res.status(400).json({
      status: "error",
      message: "Event not found",
    });
  }

  event.participants.push(
    Participant({ name: userRequest.name, email: userRequest.email })
  );

  const result = await event.save();

  console.log("Result", result);

  return res.status(200).json({
    status: "success",
    message: "User registered in event successfully",
  });
};

module.exports = {
  getEvents,
  updateEvents,
  createEvents,
  deleteEvents,
  registerEventByUser,
};

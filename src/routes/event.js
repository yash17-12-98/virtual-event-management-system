const express = require("express");
const event = express.Router();

const {
  verifyToken,
  checkAuthoriseUserAccess,
} = require("../middlewares/auth");

const {
  getEvents,
  updateEvents,
  deleteEvents,
  createEvents,
  registerEventByUser,
} = require("../controllers/event");

event.get("/", verifyToken, checkAuthoriseUserAccess, getEvents);

event.post("/", verifyToken, checkAuthoriseUserAccess, createEvents);

event.put("/:id", verifyToken, checkAuthoriseUserAccess, updateEvents);

event.delete("/:id", verifyToken, checkAuthoriseUserAccess, deleteEvents);

event.post("/:id/register", verifyToken, registerEventByUser);

module.exports = event;

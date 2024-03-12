const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = Schema({
  name: {
    type: String,
    required: [true, "Event name not provided"],
  },
  description: {
    type: String,
    required: [true, "Event description not provided"],
  },
  eventDate: {
    type: Date,
    required: [true, "Event date not provided"],
  },
  participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Event", eventSchema);

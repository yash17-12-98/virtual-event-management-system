const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const participantsSchema = Schema({
  name: String,
  email: String,
});

module.exports = mongoose.model("Participant", participantsSchema);

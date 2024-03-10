const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = Schema({
  name: {
    type: String,
    require: [true, "Name not provided"],
  },
  email: {
    type: String,
    required: [true, "Email not provided"],
    lowercase: true,
    trim: true,
    unique: [true, "Email already exists in the database"],
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Invalid email address format",
    },
  },
  role: {
    type: String,
    enum: ["Event organizer", "Attendee"],
    required: [true, "Role not provided"],
  },
  password: {
    type: String,
    required: [true, "Password not provided"],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);

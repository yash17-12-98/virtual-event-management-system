const mongoose = require("mongoose");

async function mongoDbConnect(url) {
  return await mongoose.connect(url);
}

module.exports = { mongoDbConnect };

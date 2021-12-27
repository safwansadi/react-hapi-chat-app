const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    room: String,
    author: String,
    message: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Message", messageSchema);

"use strict";

const mongoose = require("../config/mongoose");
const logger = require("../utils/logger");

const connection = mongoose.connection;

connection.on("error", function (error) {
  logger.error("db.js", error);
});

connection.once("open", function () {
  logger.debug("db.js", {
    message: "Database connection established!",
  });
});

module.exports = mongoose;

"use strict";

const { createLogger, format, transports } = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const { combine, timestamp, colorize, errors, prettyPrint, simple } = format;
const timestampFormat = { format: "YYYY-MM-DD HH:mm:ss" };
const { LOG_ROOT_DIR_NAME } = require("../utils/env");

const debugLogger = createLogger({
  level: "debug",
  defaultMeta: { service: "messanger-app" },
  transports: [
    new DailyRotateFile({
      filename: LOG_ROOT_DIR_NAME + "/debug.log",
      level: "debug",
      format: combine(
        timestamp(timestampFormat),
        errors({ stack: true }),
        prettyPrint()
      ),
    }),
    new transports.Console({
      level: "debug",
      format: combine(
        colorize(),
        timestamp(timestampFormat),
        errors({ stack: true }),
        simple()
      ),
    }),
  ],
});

const infoLogger = createLogger({
  level: "info",
  defaultMeta: { service: "messanger-app" },
  transports: [
    new DailyRotateFile({
      filename: LOG_ROOT_DIR_NAME + "/info.log",
      level: "info",
      format: combine(
        timestamp(timestampFormat),
        errors({ stack: true }),
        prettyPrint()
      ),
    }),
  ],
});

const errorLogger = createLogger({
  level: "error",
  defaultMeta: { service: "messanger-app" },
  transports: [
    new DailyRotateFile({
      filename: LOG_ROOT_DIR_NAME + "/error.log",
      level: "error",
      format: combine(
        timestamp(timestampFormat),
        errors({ stack: true }),
        prettyPrint()
      ),
    }),
    new transports.Console({
      level: "error",
      format: combine(
        colorize(),
        timestamp(timestampFormat),
        errors({ stack: true }),
        simple()
      ),
    }),
  ],
});

module.exports = {
  debugLogger,
  infoLogger,
  errorLogger,
};

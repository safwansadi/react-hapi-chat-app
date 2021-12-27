"use strict";

const { errorLogger, debugLogger, infoLogger } = require("../config/winston");
const { ENV } = require("./env");
const { DEV, STAGING } = require("./constants");
const _ = require("lodash");

module.exports = {
  debug: (tag, data) => {
    if (ENV === DEV || ENV === STAGING) debugLogger.debug(tag, { tag, data });
  },

  info: (tag, data) => {
    infoLogger.info(tag, { tag, data });
  },

  error: (tag, error) => {
    if (error instanceof Error)
      errorLogger.error(error.message, { tag, data: { ...error } });
    else errorLogger.error(tag, { tag, data: error });
  },
};

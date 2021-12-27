"use strict";

const { ENV, HOST, PORT } = require("../utils/env");
const { DEV } = require("../utils/constants");
const { connectSocket } = require("../config/socket");
const logger = require("../utils/logger");

const config = async () => {
  require("./db");
  const server = require("@hapi/hapi").server({
    host: HOST || "localhost",
    port: PORT || 8080,
    routes: {
      cors: true,
    },
    debug: false, // disable Hapi debug console logging
  });

  await server.register([
    {
      plugin: require("hapi-pino"),
      options: {
        logPayload: true,
        logRouteTags: true,
        logRequestStart: true,
        logRequestComplete: true,
        prettyPrint: true,
        logEvents: ENV === DEV && [
          "onPostStart",
          "onPostStop",
          "onRequest",
          "response",
          "request",
          "request-error",
          "log",
        ],
        // Redact Authorization headers, see https://getpino.io/#/docs/redaction
        redact: ["req.headers.authorization"],
      },
    },
    // require("inert"),
    // require("hapi-auth-jwt2"),

    //require("../plugins/authentication"),
    //require("../plugins/chat"),
    require("../plugins/messages"),
  ]);

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "<h1>Hello World!</h1>";
    },
    // options: {
    //   auth: false, // Remove this line if 'jwt' authentication required
    //   validate: {},
    // },
  });

  return server;
};

exports.init = async () => {
  const server = await config();

  try {
    await server.initialize();

    return server;
  } catch (error) {
    logger.error("server.js", error);
  }

  return null;
};

exports.start = async () => {
  const server = await config();

  connectSocket(server);
  try {
    await server.start();
  } catch (error) {
    logger.error("server.js", error);
  }
};

process.on("unhandledRejection", (error) => {
  logger.error("server.js", error);
  process.exit(1);
});

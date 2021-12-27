"use strict";

const Boom = require("@hapi/boom");

const errorMapper = (object) => {
  // console.error(object);

  let message = "";

  if (object && object.errors && object.errors[0] && object.errors[0].message) {
    const { message: errorMessage } = object.errors[0];
    message = errorMessage;
  } else if (object && object.parent && object.parent.sqlMessage) {
    const { sqlMessage: errorMessage } = object.parent;
    message = errorMessage;
  } else if (object && object.message) {
    const { message: errorMessage } = object;
    message = errorMessage;
  }

  // mongo errors
  if (object && object.errors && object._message) {
    return Boom.badRequest(object._message);
  }

  const { name } = object || {};

  // error mapper for other purpose
  if (name === "badRequest") {
    // 400
    return Boom.badRequest(message);
  }

  if (name === "unauthorized") {
    // 401
    return Boom.unauthorized(message || "You are not authorized");
  }

  if (name === "paymentRequired") {
    // 402
    return Boom.unauthorized(message);
  }

  if (name === "forbidden") {
    // 403
    return Boom.forbidden(message);
  }

  if (name === "notFound") {
    // 404
    return Boom.notFound(message);
  }

  if (name === "badImplementation") {
    return Boom.badImplementation(message);
  }

  // if all others fails
  if (!message)
    message = "Something went wrong, please have patient and try again.";
  return Boom.badImplementation(message);
};

module.exports = {
  error: (object) => {
    const boomError = errorMapper(object);

    return boomError;
  },

  success: (data, message) => {
    return {
      statusCode: 200,
      data,
      message,
    };
  },
};

const handlers = require("./handlers");
module.exports = [
  {
    method: "POST",
    path: "/api/chat",
    handler: handlers.sendMessage,
    options: {
      auth: false,
      validate: {},
    },
  },
  {
    method: "GET",
    path: "/api/chat/{roomId}",
    handler: handlers.getMessage,
    options: {
      auth: false,
      validate: {},
    },
  },
];

const Message = require("../models/message");

module.exports = {
  add: async (payload) => {
    try {
      const result = await Message.create(payload.messageData);
      return { success: true, data: result };
    } catch (error) {
      console.log(error);
    }
  },
  get: async (params) => {
    try {
      const result = await Message.find({ room: params.roomId });
      return { success: true, data: result };
    } catch (error) {
      console.log(error);
    }
  },
};

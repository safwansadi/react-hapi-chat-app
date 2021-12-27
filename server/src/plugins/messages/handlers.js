const { success, error } = require("../../utils/response");
const service = require("../../services/message");
const { request } = require("https");

module.exports = {
  sendMessage: async (request, h) => {
    const { payload } = request;

    const result = await service.add(payload);

    if (!result.success) return error(result.data);

    return success(result.data, "message added");
  },
  getMessage: async (request, h) => {
    const { params } = request;

    const result = await service.get(params);

    if (!result.success) return error(result.data);

    return success(result.data, "message received");
  },
};

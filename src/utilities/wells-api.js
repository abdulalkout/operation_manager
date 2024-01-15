import * as sendRequests from "./send-request";

const BASE_URL = "/api/wells";

export function getAll() {
  return sendRequests.sendRequest(BASE_URL);
}

export function getById(id) {
  return sendRequests.sendRequest(`${BASE_URL}/${id}`);
}

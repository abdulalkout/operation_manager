import * as sendRequests from "./send-request";

const BASE_URL = "/api/rigs";

export function getAll() {
  return sendRequests.sendRequest(BASE_URL);
}

export function getRigById(id) {
  return sendRequests.sendRequest(`${BASE_URL}/${id}`);
}

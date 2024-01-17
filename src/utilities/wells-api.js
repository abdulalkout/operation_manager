// wells-api.js

import { sendRequest } from "./send-request";

const BASE_URL = "/api/wells";

export function getAll() {
  return sendRequest(BASE_URL);
}

export function getById(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

export function getProductionWells() {
  return sendRequest(`${BASE_URL}/production`);
}

export function getDevelopmentWells() {
  return sendRequest(`${BASE_URL}/development`);
}

export async function addWell(wellData) {
  return sendRequest(BASE_URL, "POST", wellData);
}

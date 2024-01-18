import { sendRequest } from "./send-request";

const BASE_URL = "/api/rigs";

export function getAll() {
  return sendRequest(BASE_URL);
}

export function getRigById(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

export async function addRig(rigData) {
  return sendRequest(`${BASE_URL}/addRig`, "POST", rigData);
}

export async function editRig(rigData) {
  return sendRequest(`${BASE_URL}/editrig/${rigData._id}`, "PUT", rigData);
}

export async function deleteRig(id) {
  return sendRequest(`${BASE_URL}/delete/${id}`, "DELETE");
}

import { API_BASE } from "./apimain";

export async function groupmembersapi(userId, groupId) {
  const apires = await fetch(
    `${API_BASE}/groups/${groupId}/users/${userId}`,
    { method: "POST" }
  );
  if (!apires.ok) throw new Error("Add member failed");
  return apires.json();
}

export async function getusers(groupId) {
  const apilistres = await fetch(
    `${API_BASE}/groups/${groupId}/users`,
    { method: "GET" }
  );
  if (!apilistres.ok) throw new Error("Get users failed");
  return apilistres.json();
}

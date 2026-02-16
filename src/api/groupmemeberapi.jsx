import { API_BASE } from "./apimain";

export async function groupmembersapi(userId, groupId) {
  const apires = await fetch(
    `https://expense-tracker-backend-jgkz.onrender.com/groups/${groupId}/users/${userId}`,
    { method: "POST" }
  );
  if (!apires.ok) throw new Error("Add member failed");
  return apires.json();
}

export async function getusers(groupId) {
  const apilistres = await fetch(
    `https://expense-tracker-backend-jgkz.onrender.com/groups/${groupId}/users`,
    { method: "GET" }
  );
  if (!apilistres.ok) throw new Error("Get users failed");
  return apilistres.json();
}

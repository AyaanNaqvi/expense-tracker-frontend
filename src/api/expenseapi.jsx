import React from "react";
import { API_BASE } from "./apimain";

export async function expenseApi(groupId, userId, expenseamount) {
    console.log("yeah",groupId,userId, expenseamount)
  const apires = await fetch(
    `${API_BASE}/groups/${groupId}/expenses?userId=${userId}&amount=${expenseamount}`,
    { method: "POST" }
  );

  if (!apires.ok) {
    throw new Error("Error adding expenses");
  }

  return apires.json();
}

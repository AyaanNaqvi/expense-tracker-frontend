import React from "react";

export async function expenseApi(groupId, userId, expenseamount) {
    console.log("yeah",groupId,userId, expenseamount)
  const apires = await fetch(
    `http://localhost:8080/groups/${groupId}/expenses?userId=${userId}&amount=${expenseamount}`,
    { method: "POST" }
  );

  if (!apires.ok) {
    throw new Error("Error adding expenses");
  }

  return apires.json();
}

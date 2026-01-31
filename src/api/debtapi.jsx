import React from "react";

export async  function debtapi(){
    const debtlist= await fetch(`http://localhost:8080/debts`,{
        method: "GET"
    }
)
if(!debtlist.ok) return new Error ("debtlist api problem")
    return debtlist.json();
}
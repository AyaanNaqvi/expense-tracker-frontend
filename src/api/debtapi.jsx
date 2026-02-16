import React from "react";
import { API_BASE } from "./apimain";

export async  function debtapi(){
    const debtlist= await fetch(`${API_BASE}/debts`,{
        method: "GET"
    }
)
if(!debtlist.ok) return new Error ("debtlist api problem")
    return debtlist.json();
}
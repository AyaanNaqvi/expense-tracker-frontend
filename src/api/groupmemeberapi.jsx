import React from "react";
import { API_BASE } from "./apimain";

export async function groupmembersapi(userId,groupId){
    console.log("POST groupId:", groupId);
console.log("POST userId:", userId);
    const apires= await fetch(`https://expense-tracker-backend-jgkz.onrender.com/${userId}`,{
method:"POST"
    })
   
        return apires.json();   
    
}

export async function getusers(groupId){
    const apilistres= await fetch (`https://expense-tracker-backend-jgkz.onrender.com/groups/${groupId}/users`,{
        method: "GET"
    })
   
        return apilistres.json();
}

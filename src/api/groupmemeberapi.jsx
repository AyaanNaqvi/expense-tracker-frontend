import React from "react";
import { API_BASE } from "./apimain";

export async function groupmembersapi(userId,groupId){
    console.log("POST groupId:", groupId);
console.log("POST userId:", userId);
    const apires= await fetch(`${API_BASE}/${userId}`,{
method:"POST"
    })
   
        return apires.json();   
    
}

export async function getusers(groupId){
    const apilistres= await fetch (`${API_BASE}/groups/${groupId}/users`,{
        method: "GET"
    })
   
        return apilistres.json();
}

import React from "react";
import { API_BASE } from "./apimain";


export async function groupapi(payload){
const apires= await fetch(
    `${API_BASE}/groups`,{
        method: "POST",
    headers:{
        "content-type": "application/json"
    },
    body:JSON.stringify(payload),
    }
)
if (!apires.ok) throw new Error ("failed to create group")
    return apires.json();
}
export async function getGroups(){
const grouplist= await fetch ( `${API_BASE}/groups`,
    {
method: "GET"
    })
    if (!grouplist.ok) throw new Error("group list error");
    
return grouplist.json();
}

export async function deletegroup(groupId){
    console.log(groupId)
    const deletedgroup= await fetch(`${API_BASE}/groups/${groupId}`,{
        method:"DELETE"
    })
    if(!deletedgroup.ok) throw new Error ("delete error")
}


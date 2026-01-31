import React from "react";

export async function groupmembersapi(userId,groupId){
    console.log("POST groupId:", groupId);
console.log("POST userId:", userId);
    const apires= await fetch(`http://localhost:8080/groups/${groupId}/users/${userId}`,{
method:"POST"
    })
    if(!apires.ok) throw new Error ("group member fail")
        return apires.json();   
    
}

export async function getusers(groupId){
    const apilistres= await fetch (`http://localhost:8080/groups/${groupId}/users`,{
        method: "GET"
    })
    if (!apilistres.ok) throw new Error ("list error")
        return apilistres.json();
}

import React from "react";
export async function userapi(payload){
    const apires= await fetch("http://localhost:8080/user",{

method: "POST",
headers: {"content-type": "application/json"},
body: JSON.stringify(payload)

    })
if (!apires.ok) throw new Error ("error with user addition");
    return apires.json();
    
    
}
export async function getUser(){
    const apires= await fetch(`http://localhost:8080/user`,
        {
            method: "GET"
        }
        
    )
    if(!apires.ok) return new Error ("user list issue")
        return apires.json();
}

import React, { useEffect, useState } from "react";
import { getusers } from "./api/groupmemeberapi";
import { groupapi } from "./api/groupsapi";
import "./userlist.css";

export default function Userlist({groupId,expenseId,users,setusers}){

    useEffect( ()=>{
        if(!groupId) return;
        async function fetchusers(){
        const userslist=  await getusers(groupId);
        setusers(userslist);
        }
        fetchusers(groupId);

    },[groupId])



return (
  <div className="userlist"
  >
       <h1
      style={{
        color:"white",
          opacity: 0.8,
        

      }}>Users</h1>
      <ul
      style={{
        width: "100px"
      }}>
    {Array.isArray(users) && users.map((u) => {

      return (
<li
style={{
  color: "white",
  opacity: 0.8,
  width: "100px"
}} key={u.id}  >
           {u.user?.username ?? u.username}
        </li>
      );
    })}
  </ul>

 </div>

);

}


    
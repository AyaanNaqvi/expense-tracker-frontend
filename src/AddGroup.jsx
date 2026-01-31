import React, { useEffect, useState } from "react";
import "./App.css";
import Modal from "react-modal";
import { useNavigate } from 'react-router-dom'
import { groupapi } from "./api/groupsapi";
import { userapi } from "./api/userapi";
import { getusers, groupmembersapi } from "./api/groupmemeberapi";
import { expenseApi } from "./api/expenseapi";
import './addgroup.css'



export function AddGroup({groupId,userId,expenseId,setuserId,setexpenseId,setgroupId,debtId,setdebtId}){

    const [addtext,setaddtext]= useState("")
    const [modalvisible,setmodalvisible]=useState(false)
    const [memberstext,adddedmemberstext]=useState("")
    const [expenseamount,setexpenseamount]=useState("")
    const [addemail,setaddemail]=useState("")
    const [users, setUsers] = useState([]);
    const [expensemodalvisible,setexpensemodalvisible]=useState(false)


    const navigate= useNavigate();
    useEffect(()=>{
async function getlist(){
     if (!groupId) return;
    const data= await  getusers(groupId)
    setUsers(data);
}
getlist();
    },[groupId])
    return (
        <div className="addscreen">
            <div className="addgrouptextandinput">
    <h1
     style={{
color:"white",
opacity: 0.6 
}}>
        Add Group
    </h1>
    <div>
    <input 
    style={{
        opacity:"0.6"
    }}
    placeholder="add group"
    value={addtext}
    onChange={(e)=>setaddtext(e.target.value)}
    ></input>


    <button
onClick={async()=>{
    if (!addtext.trim()) return;
    const group= await groupapi({name:addtext.trim()})

    setgroupId(group.Id)
    console.log("group",group)
    setmodalvisible(true)
    setaddtext("")
setexpenseamount("")}}  

> +</button>
</div>
<div>
  <Modal className='addmodal'
  isOpen={modalvisible}
    closeTimeoutMS={200}
  style={{
     overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.35)", 
    },
    content: {
      width: "380px",
      maxWidth: "90vw",
      inset: "unset",
      margin: "auto",
      padding: "20px",
      borderRadius: "8px",
      backgroundColor: "#ebebeb",
        left: "550px",
        top:"180px",
        height: "250px",
              height: "auto",       
      overflow: "visible",
        maxHeight: "1000px"

    }
  }}
  onRequestClose={()=>{setmodalvisible(false)

  }}>
    <h1>
        Add members to the group
    </h1>
<input
placeholder="add name"
value={memberstext}
onChange={(e)=>adddedmemberstext(e.target.value)
    
}

></input>
<input
placeholder="add email"
value={addemail}
onChange={(e)=>setaddemail(e.target.value)
    
}

></input>
   
    <button
    onClick={async ()=>{
   
        if(!memberstext.trim()||!addemail.trim()) return 
const user= await userapi({
   username :memberstext.trim(),
    email: addemail.trim()
});
console.log("response",user)

await groupmembersapi(user.id,groupId);
const updated= await getusers(groupId);
setUsers(updated);
setuserId(user.id);
     adddedmemberstext("")
        setaddemail("")


        }
        
    }>
        +
   
     </button>
  
    

<ul>
    {users.map((member)=>{
return( <li
     style={{color: "black"}} key={member.id}>{member.user.username} </li>
)
    
})}
</ul>
<button 
onClick={
    ()=>{
        setexpensemodalvisible(true)
        setmodalvisible(false)
        
    }
}>
create group
</button>
  </Modal>
</div>


<Modal
  isOpen={expensemodalvisible}

  style={{
    overlay: {
      backgroundColor: "rgba(0,0,0,0.35)",
    },
    content: {
      position: "fixed",
      inset: "50% auto auto 50%",
      transform: "translate(-50%, -50%)",

      width: "260px",
      padding: "20px",

      backgroundColor: "#ebebeb",
      borderRadius: "8px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      top: "272px",
      opacity:0.8,
     
    }
  }}






  onRequestClose={()=>{setexpensemodalvisible(false)}}
>
<input
placeholder="add expense"
value={expenseamount}
onChange={(e)=>setexpenseamount(e.target.value)}
>
</input>
<button
onClick={async ()=>{
    const expense= await expenseApi(groupId,users[0].user.id,expenseamount)
    setexpenseId(expense.id)
    
    console.log("expense id:",expense.id,"expense amount:",expenseamount)
    setexpensemodalvisible(false)
    navigate("/")
}}>
done

</button>

  </Modal>
  
    </div>

    </div>



    );
}
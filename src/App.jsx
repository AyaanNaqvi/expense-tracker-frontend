import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { AddGroup } from './AddGroup'
import './App.css'
import Modal from "react-modal";
import { deletegroup, getGroups } from './api/groupsapi'
import Userlist from './userlist'
import { debtapi } from './api/debtapi'
import { getUser, userapi } from './api/userapi'
import { getusers } from './api/groupmemeberapi'







export function Home({setgroupId,userId,users}) {
    const [text,settext]= useState("")
    const [groups,setgroups]= useState([])
    const [debts,setdebts]=useState({})
  const navigate= useNavigate();
 
  

  
    useEffect(()=>{
    async function fetchlist(){ 
      const updatedlist= await getGroups();
    setgroups(updatedlist)

    }
    fetchlist();
  },[])

useEffect(()=>{
    async function fetchdebt(){
      if (!users.length) return;
      const debtmap= await debtapi()
      setdebts(debtmap);
    }

fetchdebt();
  },[groups,users]
)

 function findusername(userId,users){
  const user=  users.find((u)=>u.id==userId)
   return user? user.username: "no username"
}

return (


<div className='screen '
>


<button className='addbutton'
onClick={()=>navigate("/add")}
>
Add group +
</button>

<div className='groupbox'>
<ul className='grouplist'>
<h1 style={{
color:"white",
opacity: 0.6 
}}>
  Groups</h1>

{groups.map((gp)=>(

 <li
  key={gp.Id}>{gp.name}
<button
className='buttons'
onClick={async () => {
  await deletegroup(gp.Id);
  setgroups(prev => prev.filter(g => g.Id !== gp.Id));
}}




>
  ✔
</button>

<button
className='buttons'

onClick={()=>{ 
  setgroupId(gp.Id)
  navigate("/members")
}
}>
:
</button>
</li>
))}












</ul>
 </div>


<div className='expense'>
 

<ul className='expenselist'>

{users.length == 0? null :
Object.entries(debts).map(
  ([key,amount])=>{
    const [firstvalue,secondvalue]=key.split("-") //first->second is +
    const paidby= amount>0? secondvalue: firstvalue;
    const paidbyusername=findusername(paidby,users);
    const owedby= amount>0? firstvalue: secondvalue;
    const owedbyusername= findusername(owedby,users)
    const finalamount= Math.abs( Math.round(amount))
    return (
    <li key={key}>
{owedbyusername} owes {paidbyusername} {finalamount}
    </li>
    )
  }
)



}
</ul>



</div>





    </div>

)
}


export default function App() {

  const [groupId, setgroupId] = useState("");
  const [userId, setuserId] = useState("");
  const [expenseId,setexpenseId]=useState("")
  const [debtId,setdebtId]=useState("")
  const [users,setusers]=useState([])
  useEffect(()=>{
    async function getuserlist(){
    const userlist= await getUser();
    setusers(userlist);
  }getuserlist()},[])
  return (
    <BrowserRouter>
      <Routes>
        <Route
  path="/"
  element={<Home 
  setgroupId={setgroupId}
  userId={userId} 
  setuserId={setuserId}
  users={users}
  setusers={setusers}
  />
  }
/>

        <Route
        path='/members'
element={<Userlist
users={users}
setusers={setusers}
groupId={groupId}
userId={userId}
expenseId={expenseId}
/>}
>
        </Route>
        <Route
          path="/add"
          element={
            <AddGroup
              groupId={groupId}
              userId={userId}
              setgroupId={setgroupId}
              setuserId={setuserId}
              expenseId={expenseId}
              setexpenseId={setexpenseId}
              debtId={debtId}
              setdebtId={setdebtId}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}



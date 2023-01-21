import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Orders(){
const [list,setList]=useState([])
const [tem,setTem]=useState({})
const [complist,setComplist]=useState([])
const [err,setErr]=useState("")
const orderDelievered=(data)=>{
    const url="http://localhost:4000/completedOrders"
    console.log(data)
    console.log(`http://localhost:4000/orders/${data.id}`)
    setTem(data)
    axios.post(url,data).then((res)=>{
        console.log("Data is transfered")
        console.log(res)
    }).catch((err)=>{
        console.log(err.response.data)
        console.log(data)
    })
    
    axios.delete(`http://localhost:4000/orders/${data.id}`).then((res)=>{
        console.log("data deleted in the order List",res)
    }).catch((err)=>{
        console.log(err.response.data)
    })
    
}
const fetchData=()=>{
    const url="http://localhost:4000/orders"
    const url1="http://localhost:4000/completedOrders"

    axios.get(url).then((res)=>{
        setList(res.data)
    }).catch((err)=>{
        console.log("Get from the Orders Failed",err.response.data)
        setErr("Someting went wrong")
    })
    axios.get(url1).then((res)=>{
        setComplist(res.data)
    }).catch((err)=>{
        console.log("Get from the Completed Order List Failed",err.response.data)
    })
}
useEffect(fetchData,[tem])
    return(
        <div>
            <h3 style={{textAlign:"center"}}>Pending Orders</h3>
            {list?<div>
                <table className="table table-dark  table-hover">
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Customer Name</th>
                        <th>Item</th>
                        <th>Table No.</th>
                        <th>Quantity No.</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                        {list.map((user,ind)=>{
                            return <tr key={ind}>
                                <th>{ind+1}</th>                                
                                <th>{user.customerName}</th>
                                <th>{user.item.title}</th>
                                <th>{user.tableNo}</th>
                                <th>{user.quantity}</th>
                                <th><button className="btn-primary" onClick={()=>orderDelievered(user)}>Complete</button></th>
                            </tr>
                        })}
                    </tbody>                
            </table></div>:{err}}

            <h3 style={{textAlign:"center"}}>Completed Orders</h3>
            {complist?<div>
                <table className="table table-dark  table-hover">
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Customer Name</th>
                        <th>Item</th>
                        <th>Table No.</th>
                        <th>Quantity No.</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                        {complist.map((user,ind)=>{
                            return <tr key={ind}>
                                <th>{ind+1}</th>                                
                                <th>{user.customerName}</th>
                                <th>{user.item.title}</th>
                                <th>{user.tableNo}</th>
                                <th>{user.quantity}</th>
                                <th>Delievered</th>
                                {/* <th><button className="btn-primary" onClick={()=>orderDelievered(user.customerName)}>Completed</button></th> */}
                            </tr>
                        })}
                    </tbody>                
            </table></div>:null}
        </div>
    )
}
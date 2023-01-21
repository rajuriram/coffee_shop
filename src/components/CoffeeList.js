import React from "react";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
// import background from "./img/cofeeshop.jpg"



const url="https://api.sampleapis.com/coffee/hot"

function CoffeeList(){
  let navigate=useNavigate();
  const [data,setData]=useState([])
  // const [message,setMessage]=useState("")

  useEffect(()=>{
    axios.get(url).then((res)=>{
      setData(res.data)
      console.log(res.data)
      // console.log(data)
    }).catch((err)=>{
      console.log(err.response.data)
    })
  },[])

    return(
        <div className="Book_App">
            <div className='container-fluid mt-5'>
          <div className='row'>
        {data.map((data,index)=>{
          return  <div className="col-md-3" key={index}>
                        <img src={data.image} className="card-img-top" alt={data.id}/>
                        <div className="card-body">
                          <h5 className="card-title">{data.title}</h5>
                          <p className="card-text">{data.description}</p>
                          <h6>Ingredients:</h6>
                          <ol>
                          {data.ingredients.map((item,ind)=>{
                           return (                          
                             <li key={ind}>{item}</li> 
                            // <p key={ind}>{`${ind+1}.${item}`}</p>
                            // <li key={ind}>{`${ind+1}. ${item}`}</li>                         
                           );
                          })} 
                          </ol>
                                                    
                        </div>
                        <button className='btn-primary'onClick={()=>navigate(`/book/${data.title}`)}>Buy {data.title}</button>
                        <div>--------------------------------------------------</div>
                      </div>
                 
              
        })}
          </div>
           </div>

        </div>
    )
}
export default CoffeeList;
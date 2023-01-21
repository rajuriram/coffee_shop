import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import background from "../img/logo5.jpeg"


export default function BookForm(props){
    let {title}=useParams()
    const [data,setData]=useState({
        customerName:"",
        item:{title},
        quantity:"",
        tableNo:""
    })
    const [success,setSuccess]=useState("")
    const [error,setError]=useState("")
    const [formvalid,setFormvalid]=useState({
        errorMessage:{
            customerNameError:"",
            quantityError:"",
            tableNoError:""
        },
        formValidation:{
            customerNameError:false,
            quantityError:false,
            tableNoError:false,
            buttonActive:false
        }
        
    })
    const handleChange=(e)=>{
        let {name,value}=e.target
        console.log(name,value)
        setData({
            ...data,[name]:value
        })
        validateField(name,value)    
    }
    const validateField=(name,value)=>{
        let {errorMessage,formValidation}=formvalid
        switch(name){
            case "customerName":
            if(value===""){
                errorMessage.customerNameError="Kindly enter the Customer Name";
                formValidation.customerNameError=false
            }else{
                errorMessage.customerNameError="";
                formValidation.customerNameError=true
            }
            break;
            case "quantity":
            if(value===""){
                errorMessage.quantityError="Enter the valid quantity";
                formValidation.quantityError=false
            }else if(value<=0 || value>7){
                errorMessage.quantityError="Enter the quantity between 1 to 7";
                formValidation.quantityError=false
            }
            else{
                errorMessage.quantityError="";
                formValidation.quantityError=true
            }
            break;
            case "tableNo":
            if(value===""){
                errorMessage.tableNoError="Kindly enter the Table";
                formValidation.tableNoError=false
            }else if(value<=0 || value>15){
                errorMessage.tableNoError="There is only 1-15 tables available";
                formValidation.tableNoError=false
            }
            else{
                errorMessage.tableNoError="";
                formValidation.tableNoError=true
            }
            break;
            }
            formValidation.buttonActive= formValidation.customerNameError && formValidation.quantityError && formValidation.tableNoError
            setFormvalid({
                errorMessage:errorMessage,
                formValidation:formValidation
            })
    }
    const handleSubmit=(event)=>{
        event.preventDefault()
        console.log("button Clicked")
        const url="http://localhost:4000/orders"
        axios.post(url,data).then((res)=>{
            console.log(res.data)
            setSuccess(`Hi! ${res.data.customerName}, Your Order has been placed, we will deliever your order to your table soon `)
            setData({
                customerName:"",
                item:{title},
                quantity:"",
                tableNo:""
            })
        }).catch((err)=>{
            console.log(err.response.data)
            setError("Something went wrong")
        })

    }
    
    return(
        <>
            {/* <h1>{title}</h1> */}
            <div style={{
            backgroundImage: 'url('+background+')',
            backgroundSize: "contain",
            backgroundPosition: 'right',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: "fixed",
            height: "75vh",
            width: '100vw',
            
          }}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-header text text-center">
                                <h3 id="card-title">
                                    Ordering : {title}
                                </h3>
                            </div>
                            <div className="card-body">
                            <form onSubmit={(e)=>handleSubmit(e)}>
                                <div className="form-group">
                                     <label className="form-label" htmlFor="item">Item Name:</label>
                                    <input
                                     className="form-label form-control"
                                     type="text"
                                     value={title}
                                     name="item"
                                    id="item"
                                    disabled
                                    onChange={(e)=>handleChange(e)}                                   
                                     ></input>
                                </div>  
                                <div className="form-label form-group">
                                    <label className="form-label" htmlFor="customerName">Name of the Customer:</label>
                                    <input
                                     className="form-control"
                                     type="text"
                                     value={data.customerName}
                                     name="customerName"
                                     id="customerName"
                                     placeholder="Enter the Customer Name"
                                     onChange={(e)=>handleChange(e)}                                   
                                     ></input>
                                </div> 
                                  {formvalid.errorMessage.customerNameError?<span className="text text-danger">{formvalid.errorMessage.customerNameError}</span>:null}
                                <div className="form-label form-group">
                                     <label className="form-label" htmlFor="quantity">Quantity:</label>
                                    <input
                                     className="form-control"
                                     type="number"
                                     value={data.quantity}
                                     name="quantity"
                                     id="quantity"
                                     placeholder="Enter the Quantity"
                                     onChange={(e)=>handleChange(e)}                                   
                                     ></input>
                                </div> 
                                {formvalid.errorMessage.quantityError?<span className="text text-danger">{formvalid.errorMessage.quantityError}</span>:null}
                                <div className="form-group">
                                     <label className="form-label" htmlFor="tableNo">Table No.</label>
                                    <input
                                     className="form-control"
                                     type="number"
                                     value={data.tableNo}
                                     name="tableNo"
                                     id="tableNo"
                                     placeholder="Enter the Table No."
                                     onChange={(e)=>handleChange(e)}                                   
                                     ></input>
                                </div> 
                                
                                {formvalid.errorMessage.tableNoError?<div className="text text-danger">{formvalid.errorMessage.tableNoError}</div>:null}
                                <button type="submit" disabled={!formvalid.formValidation.buttonActive} className="btn btn-primary" id="confirmBtn">Place Order</button>    
                             </form>
                             {success?<span className="alert-success">{success}</span>:null}
                             {error?<span className="alert-danger">{error}</span>:null}


                            </div>
                            
                        </div>

                    </div>

                </div>
            </div>
        </div>
            
        </>
    )
}
import React from "react";
import background from "../img/logo5.jpeg"


export default function Home(){
    return(
        <div style={{
            backgroundImage: 'url('+background+')',
            backgroundSize: "contain",
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: "fixed",
            height: "75vh",
            width: '100vw',
            
          }}>
            <h1 style={{color: "#8b4513",textAlign:"center"}}>Welcome to the Coffee Shop</h1>
            <p>Coffee Shop provides different varieties of Coffee's.</p>
        </div>
    )
}
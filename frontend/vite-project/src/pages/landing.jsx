import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
export default function Landing() {
    return (
        <div className="landingpagecontainer">
           <nav>
            <div className="navheader">
                <h2>Echo Link</h2>
            </div>
            <div className="navlist">
                <p>Join As Guest</p>
                <p>Register</p>
                <button>Login</button>
            </div>
           </nav>

           <div className="landingmaincontainer">
            <div><h1><span style={{color: "#ff9839"}}>Connect </span>With Your Loved Ones</h1>
            <p>Cover a distance by using Echo Link</p>
            <div role="button">
                <Link to ={"/auth"}>Get Started</Link>
            </div>
            </div>
            <div>
                <img src="/mobile.png" alt="#"/>
            </div>
           </div>
        </div>
    );
}
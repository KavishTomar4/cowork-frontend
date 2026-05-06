import React from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";

function Register(){

    let navigate = useNavigate();

    let sendData = async(e)=>{
        e.preventDefault();
        let email = document.getElementById('email').value;
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;

        let response = await fetch('https://cowork-backend-production-a22d.up.railway.app/api/register', {
            method: 'POST',
            body: JSON.stringify({ email, username, password }),
            headers: { 'Content-Type': 'application/json' }
        })

        if(response.ok){
            let json = await response.json();
            if(json.token) localStorage.setItem('cowork', json.token);
            navigate(json.toLink);
        }
    }

    return(
        <div className="flex-col justify-center p-20 h-[20em]">
            <h1 className="ml-[27.05em] mb-9 text-2xl font-bold">Register</h1>
            <form onSubmit={sendData} className="flex flex-col justify-center">
                <input type="email" name="email" placeholder="E-Mail" id="email" className="w-[32em] ml-96 mb-5 border-b-2 border-[#654585] text-xl"/>
                <input type="text" name="username" placeholder="Username" id="username" className="w-[32em] ml-96 mb-5 border-b-2 border-[#654585] text-xl"/>
                <input type="password" name="password" placeholder="Password" id="password" className="w-[32em] ml-96 mb-5 border-b-2 border-[#654585] text-xl"/>
                <input type="submit" id="submit-btn" className="bg-[#654585] w-96 h-10 ml-[24.6em] mt-4 text-white text-xl"/>
            </form>
            <p className="text-center mt-16">or <Link to='/' className="text-blue-600">Login</Link></p>
        </div>
    );
}

export default Register;
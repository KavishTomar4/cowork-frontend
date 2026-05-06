import {useEffect} from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";

function Login(){

    let navigate = useNavigate()

    useEffect(()=>{
        let fetchData = async()=>{
            let token = localStorage.getItem('cowork');
            if(!token) return;
            let data = await fetch('https://cowork-backend-production-a22d.up.railway.app/api/getlogin', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if(data.ok){
                let json = await data.json();
                if(json.toLink !== '/') navigate(json.toLink);
            }
        }
        fetchData();
    }, [])

    let sendData = async(e)=>{
        e.preventDefault();
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;

        let response = await fetch('https://cowork-backend-production-a22d.up.railway.app/api/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        })

        if(response.ok){
            let json = await response.json();
            if(json.token) localStorage.setItem('cowork', json.token);
            navigate(json.toLink, { state: { username: json.username }});
        }
    }

    return(
        <div className="flex-col justify-center p-20 h-[20em] items-center">
            <h1 className="ml-[27.05em] mb-9 text-2xl font-bold">LOGIN</h1>
            <form onSubmit={sendData} className="flex flex-col justify-center item-center">
                <input type="text" name="username" placeholder="Username" id="username" className="w-[32em] ml-96 mb-5 border-b-2 border-[#654585] text-xl"/>
                <input type="password" name="password" placeholder="Password" id="password" className="w-[32em] ml-96 mb-5 border-b-2 border-[#654585] text-xl"/>
                <input type="submit" id="submit-btn" className="bg-[#654585] w-96 h-10 ml-[24.6em] mt-4 text-white text-xl"/>
            </form>
            <p className="text-center mt-16">or <Link to='/register' className="text-blue-600">Create Account</Link></p>
        </div>
    );
}

export default Login;
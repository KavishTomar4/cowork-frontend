import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Yourproject from "./Yourproject";
import Createproject from "./Createproject";
import Joinproject from "./Joinproject";



function Home(){

    let [username, setUsername] = useState('');
    let [currentPage, setCurrentPage] = useState('yourproject');
    let navigate = useNavigate();

     // Fetch username from backend
    useEffect(()=>{
        let fetchUser = async()=>{
            let response = await fetch('https://cowork-backend-production-a22d.up.railway.app/api/getlogin', {
                credentials: 'include' 
            });
            if(response.ok){
                let json = await response.json();
                if(json.toLink === '/') {
                    navigate('/');  
                } else {
                    setUsername(json.username);
                }
            }
        }
        fetchUser();
    }, [])

    let renderPage = () => {
        if(currentPage === 'yourproject') return <Yourproject/>
        if(currentPage === 'createproject') return <Createproject/>
        if(currentPage === 'joinproject') return <Joinproject/>
    }
    let logout = async()=>{

            let response = await fetch('https://cowork-backend-production-a22d.up.railway.app/api/logout', {credentials: 'include'});

            if(response.ok){
                let json = await response.json();
                console.log(json);
                navigate(json.toLink);
            }

    }
    return(
        <div className="flex flex-col justify-center items-center p-5">
            <h1 className="font-bold text-4xl m-6">Hello {username}</h1>
            <div id = "projects">
                <ul className="flex flex-row gap-0 shadow-md rounded-lg overflow-hidden mb-8">
                    <li className="cursor-pointer px-6 py-3 bg-[#654585] text-white font-semibold hover:brightness-110" onClick={() => setCurrentPage('yourproject')}><button>Your Projects</button></li>
                    <li className="cursor-pointer px-6 py-3 bg-[#654585] text-white font-semibold hover:brightness-110" onClick={() => setCurrentPage('createproject')}><button>Create Project </button></li>
                    <li className="cursor-pointer px-6 py-3 bg-[#654585] text-white font-semibold hover:brightness-110" onClick={() => setCurrentPage('joinproject')}><button>Join Project</button></li>
                    <li className="cursor-pointer px-6 py-3 bg-[#c91e1e] text-white font-semibold hover:brightness-110" onClick={()=> logout()} ><button>Log Out</button></li>
                </ul>
                
                <div>
                    
                   {renderPage()}
                   
                </div>
            </div>
        </div>
    );


}

export default Home;
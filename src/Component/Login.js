import {useEffect} from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";

function Login(){

    let navigate = useNavigate()
    useEffect(()=>{

        let fetchData = async()=>{
            let data = await fetch('https://cowork-backend-production-a22d.up.railway.app/api/getlogin');
            

            if(data.ok){
                let json = await data.json();
                navigate(json.toLink, {
                    state:{
                        username: json.username
                    }
                });
            }
        }

        fetchData();


    }, [])

    /*this function will be called to send data when submit button will be pressed */
    let sendData = async(e)=>{

        e.preventDefault();

        
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;

        let data = {
            username : username,
            password: password,
        }

        let response = await fetch('https://cowork-backend-production-a22d.up.railway.app/api/login', {
            method: 'POST',
            credentials: 'include',
            body : JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        
        })

        if(response.ok){
            let json = await response.json();
            navigate(json.toLink, {
                state: {
                    username: json.username
                }
            });
        }

        

    }
    

    return(
        
        /*Login form*/
        <div className="flex-col justify-center p-20 h-[20em] items-center">
            <h1 className="ml-[27.05em] mb-9  text-2xl font-bold">LOGIN</h1>
            <form action = "/api/login" method = "POST" className="flex flex-col justify-center item-center">
                <input type = "text" name = "username" placeholder="Username" id = "username" className="w-[32em] ml-96 mb-5 border-b-2 border-[#654585] text-xl "/>
                <input type = "password" name = "password" placeholder="Password" id = "password" className="w-[32em] ml-96 mb-5 border-b-2 border-[#654585] text-xl"/>
                <input type = "submit" id = "submit-btn" className="bg-[#654585] w-96 h-10 ml-[24.6em] mt-4 text-white text-xl" onClick={sendData}/>
            </form>
            <p className="text-center mt-16">or <Link to = '/register' className="text-blue-600">Create Account</Link></p>
        </div>
       
    );


}

export default Login;
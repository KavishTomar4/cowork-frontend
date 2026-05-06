import React from "react";
import { useNavigate } from "react-router-dom";

function Createproject(){

    let navigate = useNavigate();

    let sendData =  async(e)=>{

        e.preventDefault();

        let data = {
            name : document.getElementById('pjt-name').value 
        }

        let response = await fetch('https://cowork-backend-production-a22d.up.railway.app/api/createproject', {
            method: 'POST',
            credentials: 'include',
            body : JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        
        });

        if(response.ok){ 
            let json = await response.json();
            navigate(json.toLink, {
                state: {
                    members: json.members,
                    code: json.code,
                    content: json.content
                }
            });
        }

    }

    return(
        <div className="flex flex-col items-center justify-start p-10">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Project</h1>
            <form className="bg-white shadow-md rounded-lg p-8 w-[400px] flex flex-col gap-4" action = "#" method = "POST">
                <input className="border-b-2 border-[#654585] outline-none px-2 py-2 text-lg w-full" type = "text" name = "projectname" id = "pjt-name" placeholder="Projct Name"/>
                <input className="bg-[#654585] text-white py-2 rounded-lg cursor-pointer hover:brightness-110 transition-all duration-200 mt-2" type = "submit" id = "submit-btn" onClick={sendData}/>
            </form>
        </div>
    );


}

export default Createproject;
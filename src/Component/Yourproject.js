import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Yourproject(){

    let [projects, setProjects] = useState([])
    let navigate = useNavigate();

    useEffect(()=>{
        let fetchData = async()=>{
            let token = localStorage.getItem('cowork');
            if(!token) { navigate('/'); return; }
            let response = await fetch('https://cowork-backend-production-a22d.up.railway.app/api/getproject', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if(response.ok){
                let json = await response.json();
                setProjects(json.projects)
            }
        }
        fetchData();
    },[])

    return(
        <div className="flex flex-col items-center justify-start gap-4 p-6">
            {
                projects && projects.map(project=>(
                    <div className="w-full bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-xl transition-shadow duration-300">
                        <h1 className="text-xl font-bold text-gray-800">{project.name}</h1>
                        <p className="text-gray-500 text-sm">{project.code}</p>
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                navigator.clipboard.writeText(project.code)
                                alert('Code copied!')
                            }}
                            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded transition-colors duration-200">
                            Copy
                        </button>
                    </div>
                ))
            }
        </div>
    );
}

export default Yourproject;
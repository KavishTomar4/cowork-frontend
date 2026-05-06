import {useEffect, useState} from "react";
import Editor from './Editor'
import { useLocation, useParams, Link } from "react-router-dom";
import socket from "./socket";

function Project(){

    let location = useLocation();
    let members = location.state.members;
    let  code  = location.state.code;
    let initialcontent = location.state.content
    const [content, setContent] = useState(initialcontent)

    useEffect(()=>{

        socket.emit('join_room', code);

        socket.on('receive_content', (data) => {
            setContent(data.content)
        })

        return () => socket.off('receive_content')

    }, [])

    let handleChange = (value) => {
        setContent(value)
        socket.emit('send_content', {
            room: code,
            content: value
        })
    }

    let saveData = async()=>{

        let data = {
            code: code,
            content: content
        }

        let response = await fetch('https://cowork-backend-production-a22d.up.railway.app/api/savedata', {
            method: 'POST',
            body : JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        
        })

        if(response.ok){
            let json = await response.json();
            alert(json.status)
        }

    }

    return(
        <>
          <div className="flex flex-row justify-start overflow-y-hidden">
            <div id = "members" className="w-[15%] flex flex-col h-screen box-border items-center p-6 shadow-lg">
                <h1 className="text-xl font-bold mb-6">Members</h1>
                <ul>
                    {members.map(member =>{
                        return <li key={member} className="mb-2">{member}</li>
                    })}
                </ul>
            </div>
            <div id = "workspace" className="w-[85%] p-6 overflow-hidden">
                <Editor onUpdate={(html) => {
                    socket.emit('send_content', { room: code, content: html })
                }}/>
                <button className="bg-[#654585] text-white p-1 mt-3 mb-3 w-[5em]" onClick={saveData}>SAVE</button>
                <Link to="/dashboard"><button className="bg-[#654585] text-white p-1 mt-3 mb-3 ml-2 w-[5em]">HOME</button></Link>
                <br/>
                <hr/>
                <h1 className="mb-6 font-bold">DISPLAY</h1>
                <div  dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
        </>
    );


}

export default Project;
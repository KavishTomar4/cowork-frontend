import { io } from 'socket.io-client';

let URL =  'https://cowork-backend-indol.vercel.app';

let socket = io(URL, {
    withCredentials: true
});

export default socket;
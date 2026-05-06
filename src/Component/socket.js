import { io } from 'socket.io-client';

let URL =  'https://cowork-backend-production-a22d.up.railway.app';

let socket = io(URL, {
    withCredentials: true
});

export default socket;
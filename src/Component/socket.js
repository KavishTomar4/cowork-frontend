import { io } from 'socket.io-client';

let URL =  'https://cowork-backend-5nzc.onrender.com';

let socket = io(URL, {
    withCredentials: true
});

export default socket;
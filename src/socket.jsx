import { io } from "socket.io-client";

const socket = user => 
    new io(import.meta.env.VITE_APP_SERVER_URL, {
        autoConnect:false,
        withCredentials:true,
        auth: {
            token: user.token,
        }
})

export default socket;
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AccountContext = createContext();

const UserContext = ({children}) => {
    const [user,setUser] = useState({
        username:"",
        loggedIn:null,
        token: localStorage.getItem("token")
    });

    const navigate = useNavigate()

    useEffect(() =>{
        fetch(`${import.meta.env.VITE_APP_SERVER_URL}/auth/login`, {
            credentials:"include",
            headers: {
                "authorization": `Bearer ${user.token}`
            }
        }).catch(err => {
            setUser({loggedIn:false})
        }).then(res =>{
            if(!res || !res.ok || res.status >= 400) {
                setUser({loggedIn:false})
                return;
            }
            return res.json()
        }).then(data => {
            if(!data) {
                setUser({loggedIn:false})
            }
            navigate("/home")
            setUser({...data})
        })
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
        <AccountContext.Provider value={{user,setUser}}>
            {children}
        </AccountContext.Provider>
    )
}

export default UserContext;
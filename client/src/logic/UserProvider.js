import axios from "axios"
import React, {useState} from "react"
const UserContext = React.createContext()

function UserProvider(props){
    const [userInfo, setUserInfo] = useState(
        {
            token:localStorage.getItem('token')||'',
             user:JSON.parse(localStorage.getItem('user'))||{}
        }
    )

    function getIn(getInMethod, credentials){
        axios.post(`/auth/${getInMethod}`, credentials)
        .then(response=>{
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("user", JSON.stringify(response.data.user))
            setUserInfo(
            {token:response.data.token, 
                user:response.data.user
            })
        })
        .catch(err=>console.log(err.response.data.errMessage))
    }
    function logout(){
        localStorage.clear()
        setUserInfo({})
    }

 
    return(
        <UserContext.Provider value={{...userInfo, getIn, logout}}>
            {props.children}
        </UserContext.Provider>
    )
}

export {UserProvider, UserContext}
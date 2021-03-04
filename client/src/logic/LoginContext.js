import axios from "axios"
import React, {useState} from "react"
const LoginContext = React.createContext()
const userAxios = axios.create()
userAxios.interceptors.request.use(config=>{
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})
function LoginProvider(props){
    const [userInfo, setUserInfo] = useState(
        {
            token:localStorage.getItem('token')||'',
             user:JSON.parse(localStorage.getItem('user'))||{}
        }
    )
    const [users, setUsers]= useState([])

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
    function getAllUsers(){
        userAxios(`parental/users`)
        .then(response=>setUsers(response.data))
    }
    function editUser(edits){
        userAxios.put(`/parental/users/update/`, edits)
        .then(response=>{
            console.log(response.data)
            setUserInfo((prev)=>
                ({...prev,
                    user:response.data
            }))
        })
    }
    function logout(){
        localStorage.clear()
        setUserInfo({})
    }

 
    return(
        <LoginContext.Provider value={{...userInfo, users, getAllUsers, getIn, logout, editUser}}>
            {props.children}
        </LoginContext.Provider>
    )
}

export {LoginProvider, LoginContext}
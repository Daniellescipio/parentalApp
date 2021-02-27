import React, { useContext, useState } from "react"
import {UserContext} from "./logic/UserProvider"
function Login(){
    const [user, setUser]= useState({username: "", password:""})
    const {username, password} = user
    const [toggle, setToggle] = useState(true)
    const {getIn} = useContext(UserContext)
    
    function handleChange(e){
        const {name, value} = e.target
        setUser(prev=>({...prev,[name]:value}))
    }
    const getInMethod = toggle ? 'signup' : 'login'
    function logOrSign(e){
        e.preventDefault()
        getIn(getInMethod, user)
    }
    function toggler(){
        setToggle(prev=>!prev)
    }

    const buttonText = toggle ? 'Sign Up' : 'Log in'
    const loginOrSignUp = toggle ?  'Already a citizen? Log in here!': "Don't have an account? Create a new account today!"
    return(
     <div>
         <form>
             <input
             name = 'username'
             value = {username}
             type = 'text'
             onChange = {handleChange}/>
             <input
             name = 'password'
             value = {password}
             type = 'text'
             onChange = {handleChange}/>
             <button onClick = {logOrSign}>{buttonText}</button>
         </form>
         <p onClick = {toggler}>{loginOrSignUp}</p>
         

     </div>   
    )
}
export default Login
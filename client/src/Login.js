import React, { useContext, useState } from "react"
import {LoginContext} from "./logic/LoginContext"
function Login(){
    const [user, setUser]= useState({username: "", password:""})
    const {username, password} = user
    const [toggle, setToggle] = useState(true)
    const {getIn} = useContext(LoginContext)
    
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
     <div className = 'login'>
         <h1>{toggle?`Welcome to Parental, new here? Sign up below!` : `Welcome Back! It's been too long...`}</h1>
         <form>
             <input
             name = 'username'
             value = {username}
             type = 'text'
             onChange = {handleChange}/>
             <input
             name = 'password'
             value = {password}
             type = 'password'
             onChange = {handleChange}/>
             <button onClick = {logOrSign}>{buttonText}</button>
         </form>
         <button onClick = {toggler}>{loginOrSignUp}</button>
         <br/>
         <img src = {`data:image/jpeg;base64,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`} alt = 'something here' width = '300' height = '300' />
         

     </div>   
    )
}
export default Login
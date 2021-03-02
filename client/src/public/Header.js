import React from "react"
import { Link} from "react-router-dom"
import { useContext } from "react/cjs/react.development"
import {LoginContext} from "../logic/LoginContext"
function Header(){
    const {token} = useContext(LoginContext)
    console.log(token)
    function logInFirst(){
        alert `You need to Log In`
    }
    if(token){
        return(
            <div className = 'header'>
                <button><Link to = "/homepage">Home</Link></button>
                <button><Link to = "/adviceBoard">Advice Board</Link></button>
            </div>
    )
    }else{
        return(
            <div className = 'header'>
                <button onClick = {logInFirst}>Home</button>
                <button onClick = {logInFirst}>Advice Board</button>   
            </div>
        )  
    }
    
}
export default Header 
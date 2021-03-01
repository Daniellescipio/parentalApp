import React from "react"
import { Link} from "react-router-dom"
import { useContext } from "react/cjs/react.development"
import {UserContext} from "../logic/UserProvider"
function Header(){
    const {token} = useContext(UserContext)
    console.log(token)
    if(token){
        return(
            <div>
                <button><Link to = "/homepage">Home</Link></button>
                <button><Link to = "/adviceBoard">Advice Board</Link></button>
            </div>
    )
    }else{
        return(
            <div>
                <button>Home</button>
                <button>Advice Board</button>   
            </div>
        )  
    }
    
}
export default Header 
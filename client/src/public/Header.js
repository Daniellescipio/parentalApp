import React from "react"
import { Link } from "react-router-dom"
function Header(){
    return(
        <div>
            <Link to = "/homepage">Home</Link>
            <Link to = "/adviceBoard">Advice Board</Link>

        </div>
    )
}
export default Header 
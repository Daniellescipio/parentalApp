import React from "react"
import ListComponent from "../logic/ListComponent"
import { useState } from "react/cjs/react.development"

function YourConvos(props){
    const [userResponses] = useState([props.userResponses])
    return(
        <div>
            <ListComponent dataType = {userResponses}/>
        </div>
    )
}

export default YourConvos 
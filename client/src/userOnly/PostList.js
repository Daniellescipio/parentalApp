import React from "react"
import ListComponent from "../logic/ListComponent"

function PostList(props){
    return(
        <div>
            <ListComponent dataType = {props.previousPost}/>
        </div>
    )
}

export default PostList 
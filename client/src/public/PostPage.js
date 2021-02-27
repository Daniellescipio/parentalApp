import React from "react"
import {useLocation} from "react-router-dom"
import DetailPage from "../logic/DetailPage"

function PostPage(){
    const location = useLocation()
    return(
        <div>
            <DetailPage location = {location} type = 'post'/>
        </div>

    )
}
export default PostPage 
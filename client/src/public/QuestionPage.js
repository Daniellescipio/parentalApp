import React from "react"
import {useLocation} from "react-router-dom"
import DetailPage from "../logic/DetailPage"

function QuestionPage(){
    const location = useLocation()

    return(
        <div>
            <DetailPage location = {location} type = 'question'/>
        </div>

    )
}
export default QuestionPage 
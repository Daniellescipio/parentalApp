import React from "react"
import {useLocation} from "react-router-dom"
import DetailPage from "../recurringComponents/DetailPage"

function QuestionPage(){
        //responsible for passing post to detail page
    const location = useLocation()
    return(
        <div className = 'question'>
            <DetailPage location = {location.state} type = 'question'/>
        </div>

    )
}
export default QuestionPage 
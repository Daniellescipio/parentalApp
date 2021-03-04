import React, {useContext, useEffect, useState} from "react"
import {InteractionContext} from "../logic/InteractionContext"
import {LoginContext} from "../logic/LoginContext"
import ChangeVote from "../logic/useVote"

function ResponseSection(props){ 
    //get's user info from context to allow deleting
    const {user} = useContext(LoginContext)
    //response form
    const [response, setResponse] = useState({response : ''})
    //post or question body where responses will be instatiated
    const responseOwner = props.responseOwner
    const {vote, voted, subject, voteFunction, toggleVote} = ChangeVote()
    //response data and functions from context
    const {voteOnResponse, getResponses, addResponses, deleteResponses, responses} = useContext(InteractionContext)
    //decides between post and question for reusability
    const answerOrComment = responseOwner.comment? 'Comment': 'Answer'
    const postOrQuestion = responseOwner.comment? 'post': 'question'
    
    //use effect to display responses and update when new responses are added
    useEffect(()=>{
        getResponses(responseOwner._id, postOrQuestion)
        setResponse({response:''})
    // eslint-disable-next-line
    },[responses.length])

    useEffect(()=>{
        if(voted){
            voteOnResponse(subject._id, vote)
            toggleVote()
        }  
    // eslint-disable-next-line
    },[voted])
    //maps over each response to display repsonse. response + response.vote.
    //if userId matches response or post id a user will get a delete button 
    const responseList = responses.map(response=>{
        if(user._id ===responseOwner.user._id||user._id===response.user._id){
            console.log()
            return(
                <div key = {response._id} className = 'responseBox'>
                    <p className = 'response'>{response.response}</p>
                    <p className = 'vote'>current vote: {response.vote.vote}</p>
                    <p className = 'voteAuthor'>written by: {response.user.username}</p>
                    <div className = 'responseVote'>
                        <button 
                        className = 'upVote button'
                        onClick = {()=>{voteFunction(true, response)}}
                        ></button>
                        <button className = 'downVote button'
                        onClick = {()=>{voteFunction(false, response)}}
                        ></button>
                        <button onClick = {()=>
                        {
                            deleteResponses(responseOwner._id, response._id, answerOrComment)
                            getResponses(responseOwner._id, postOrQuestion)}
                        }
                        >delete</button>
                    </div>  
                </div>
            )
        }else{
            return(
                <div key = {response._id} className = 'responseBox'>
                    <p className = 'response'>{response.response}</p>
                    <p className = 'vote'>current vote: {response.vote.vote}</p>
                    <p className = 'voteAuthor'>written by: {response.user.username}</p>
                    <div className = 'responseVote'>
                        <button 
                        className = 'upVote button'
                        onClick = {()=>{voteFunction(true, response)}}
                        ></button>
                        <button className = 'downVote button'
                        onClick = {()=>{voteFunction(false, response)}}
                        ></button>
                    </div>  
                </div>
            )
        }
    }   
    )
    //tracks form changes
    function handleChange (e){
        setResponse({response: e.target.value})
    }
    return(
        <div className = 'responses'>
            {responseList}
            <div className = 'respond'>
                <p>Responde Here:</p>
                <textarea
                name = 'response'
                type = 'text'
                onChange = {handleChange}
                value = {response.response}
                />
                <button onClick = {()=>{addResponses(responseOwner._id, response, answerOrComment)}} >Respond</button>
            </div>
            
        </div>
    )
}
export default ResponseSection 
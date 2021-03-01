import React, {useContext, useEffect, useState} from "react"
import {InteractionContext} from "./useInteraction"
import {UserContext} from "./UserProvider"
import ChangeVote from "./useVote"

function ResponseSection(props){ 
    //get's user info from context to allow deleting
    const {user} = useContext(UserContext)
    //response form
    const [response, setResponse] = useState({response : ''})
    //post or question body where responses will be instatiated
    const responseOwner = props.responseOwner
    const {vote, voted, idForVoting, voteFunction} = ChangeVote()
    //response data and functions from context
    const {voteOnResponse, getResponses, addResponses, deleteResponses, responses} = useContext(InteractionContext)
    //decides between post and question for reusability
    const answerOrComment = responseOwner.comment? 'Answer': 'Comment'
    const postOrQuestion = responseOwner.comment? 'post': 'question'
//use effect to display responses and update when new responses are added

    useEffect(()=>{
        getResponses(responseOwner._id, postOrQuestion)
        setResponse({response:''})
    // eslint-disable-next-line
    },[responses.length])

    useEffect(()=>{
        if(voted){
            voteOnResponse(idForVoting, vote)
        }  
    // eslint-disable-next-line
    },[voted])
    //maps over each response to display repsonse. response + response.vote.
    //if userId matches response or post id a user will get a delete button 
    const responseList = responses.map(response=>{
        if(user._id ===responseOwner.user._id||user._id===response.user._id){
            console.log()
            return(
                <div key = {response._id}>
                    <p>{response.response}</p>
                    <p>{response.vote.vote}</p>
                    <p>{response.user.username}</p>
                    <div>
                        <div>
                            <button 
                            className = 'upVote'
                            onClick = {()=>{voteFunction(true, response)}}
                            >SMILEYFACE</button>
                            <button className = 'downVote'
                            onClick = {()=>{voteFunction(false, response)}}
                            >FROWNEYFACE</button>
                            <button onClick = {()=>
                            {
                                deleteResponses(responseOwner._id, response._id, answerOrComment)
                                getResponses(responseOwner._id, postOrQuestion)}
                            }
                            >delete</button>
                        </div> 
                    
                    </div>
                   
                </div>
            )
        }else{
            return(
                <div key = {response._id}>
                    <p>{response.response}</p>
                    <p>{response.vote.vote}</p>
                    <p>{response.user.username}</p>
                    <button 
                    className = 'upVote'
                    onClick = {()=>{voteFunction(true, response)}}
                    >SMILEYFACE</button>
                    <button className = 'downVote'
                    onClick = {()=>{voteFunction(false, response)}}>FROWNEYFACE</button>
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
        <div>
            {responseList}
            <p>Responde Here:</p>
            <textarea
            name = 'response'
            type = 'text'
            onChange = {handleChange}
            value = {response.response}
            />
            <button onClick = {()=>{addResponses(responseOwner._id, response, answerOrComment)}} >Respond</button>
        </div>
    )
}
export default ResponseSection 
import React, {useState, useContext, useEffect} from "react"
import {useLocation} from "react-router-dom"
import DetailPage from "../recurringComponents/DetailPage"
import {InteractionContext} from "../logic/InteractionContext"
import ChangeVote from "../logic/useVote"

function PostPage(){
    //gets post from the link that leads a user here
    const location = useLocation()
    //sets the post from location
    const [post, setPost] = useState(location.state)
    //data and functions from custom hook
    const {vote, voted, subject, voteFunction, toggleVote, updatePost} = ChangeVote()
    //response data and functions from context
    const {voteOnAPost} = useContext(InteractionContext)

    useEffect(()=>{
        if(voted){
            //votes on apost
            voteOnAPost(subject._id, vote)
            //updates the vote property of our post
            updatePost()
            //sets voted to false
            toggleVote()
        }  
    // eslint-disable-next-line
    },[voted])

    useEffect(()=>{
        //if there is a subject(which has been updated with our new vote) it replaces our post
        if(subject){
            setPost(subject)
        }  
    },[subject])

    return(
        <div className = 'post'>
            <DetailPage location = {post} type = 'post'/>
            <div className = 'postVote'>
                        <button 
                        className = 'upVote'
                        onClick = {()=>{voteFunction(true, post)}}
                        ></button>
                        <button className = 'downVote'
                        onClick = {()=>{voteFunction(false, post)}}
                        ></button>
                </div>  
        </div>

    )
}
export default PostPage 
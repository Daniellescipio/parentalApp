import React, {useContext, useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import {UserDataContext} from "../logic/UserDataContext"
import ResponseSection from "../recurringComponents/ResponseSection"
import {LoginContext} from "../logic/LoginContext"


function DetailPage(props){
    //pulls user from contest to allow settings to diplay
    const {user} = useContext(LoginContext)
    //decides between post or question for reusability
    let type = props.type ==='post' ? true: false
    //gets the entire post or question body from the link route
    const [postOrQuestion, setPostOrQuestion] = useState(props.location)
    //to redirect when a user deletes a post
    const history = useHistory()
    //pulls user specific data nad functions from context
    const {deletePost, editPost, editedPost, editQuestion, deleteQuestion, editedQuestion} = useContext(UserDataContext)
    //for edit form
    const [edits, setEdits] = useState(type?
    {title:postOrQuestion.title, description:postOrQuestion.description}:
    {question:postOrQuestion.question, description:postOrQuestion.description}
    )
    // variables to display/hides edit form and delete confirmation
    const [edit, setEdit] = useState(false)
    const [remove, setRemove] = useState(false)
//use Effect updates the info on the page with the info returned from edits
        useEffect(()=>{
        if(editedPost.title || editedQuestion.question){
            if(type){
                setPostOrQuestion(editedPost)
            }else{
                setPostOrQuestion(editedQuestion)
            }
        }
        // eslint-disable-next-line 
    },[editedPost, editedQuestion])
    console.log(postOrQuestion)
    //function to display edit form and delete confirmation
    function toggle(e){
        e.target.name === 'edit' ? setEdit(prev=>(!prev)) : setRemove(prev=>(!prev))
    }
    let formClass = edit? 'form' : 'hidden'
    let confirmClass = remove ? 'confirm' : 'hidden'
    //deletes question or post and redirects to homepage
    function confirmDeleteAndLeave(){
        if(remove){
            if(type){
                deletePost(postOrQuestion.topic._id, postOrQuestion._id)
            }else{
                deleteQuestion(postOrQuestion.topic._id, postOrQuestion._id)
            }
            history.push("/homepage")
        }
    }
    //calls edit function from contect with appropriate id and updates
    function editer(e){
        e.preventDefault()
        if(type){
            editPost(postOrQuestion._id, edits)
        }else{
            console.log(postOrQuestion, edits)
            editQuestion(postOrQuestion._id, edits)
        }
        setEdit(false)
    }
    //tracks form changes
    function handleChange(e){
        const{name, value} = e.target
        setEdits(prev=>({...prev, [name]:value}))
    }
    return(
        <div className = 'details'>
            <div className = 'settings'>{
                user._id===postOrQuestion.user._id?
                    <div> 
                        <button onClick = {toggle} name = 'edit'>edit </button>
                        <form className = {formClass}>
                            <input
                            name = {type ? 'title' : 'question'}
                            value = {type? edits.title: edits.question}
                            onChange = {handleChange}
                            type = 'text'/>
                            <textarea
                            name = 'description'
                            value = {edits.description}
                            onChange = {handleChange}
                            type = 'text'/>
                            <button onClick = {editer}>Submit Changes</button>
                        </form>
                        <button onClick = {toggle} name = 'delete'>delete</button>
                    <div className = {confirmClass}>
                        <p>are you sure you want to delete?</p>
                        <p onClick = {confirmDeleteAndLeave}>Yes</p>
                        <p onClick = {toggle}>No</p>
                    </div>
                    </div>
                : ''
                }
            </div>
            <div>{
            type?
                <div className = 'postPage'>
                    <h1 className = 'title'>{postOrQuestion.title}</h1>
                    <h3 className = 'author'>written by :{postOrQuestion.user.username}</h3>
                    <h3 className = 'descrip'>{postOrQuestion.description}</h3>
                    <h3 className = 'vote'>Current Vote : {postOrQuestion.vote.vote}</h3>
                </div>
                 :
                <div className = 'questionPage'>
                    <h1 className = 'title'>{postOrQuestion.question}</h1>
                    <h3 className = 'author'>written by :{postOrQuestion.user.username}</h3>
                    <h3 className = 'descrip'>{postOrQuestion.description}</h3>
                </div>
            }
            <hr/>
            </div>
            <ResponseSection responseOwner = {postOrQuestion}/>
        </div>

    )
}
export default DetailPage 
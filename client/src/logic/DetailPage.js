import React, {useContext, useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import {UserDataContext} from "../logic/useUserData"

function DetailPage(props){
    let responsesList
    let type = props.type ==='post' ? true: false
    const history = useHistory()
    const {deletePost, editPost, editedPost, loading, editQuestion, deleteQuestion, editedQuestion} = useContext(UserDataContext)
    const location = props.location
    const user = location.user || true
    //const [question, setQuestion] = useState(location.state)
    const [postOrQuestion, setPostOrQuestion] = useState(location.state)
    const [edits, setEdits] = useState(type?
    {title:postOrQuestion.title, description:postOrQuestion.description}:
    {question:postOrQuestion.question, description:postOrQuestion.description}
    )
    const [edit, setEdit] = useState(false)
    const [remove, setRemove] = useState(false)
    console.log(postOrQuestion)

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

    
    console.log(postOrQuestion.comments||postOrQuestion.answers)
    if(type){
        responsesList =postOrQuestion.comments.map(comment=>{
            return(
                <div>
                    {comment}
                </div>
            )
        })
    }else{
        responsesList = postOrQuestion.answers.map(answer=>{
            return(
                <div>
                    {answer}
                </div>
            )
        })
    }
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
    function toggle(e){
        e.target.name === 'edit' ? setEdit(prev=>(!prev)) : setRemove(prev=>(!prev))
    }
    function editer(e){
        e.preventDefault()
        if(type){
            editPost(postOrQuestion._id, edits)
        }else{
            editQuestion(postOrQuestion._id, edits)
        }
        setEdit(false)
    }
    function handleChange(e){
        const{name, value} = e.target
        setEdits(prev=>({...prev, [name]:value}))
    }

    let formClass = edit? 'form' : 'hidden'
    let confirmClass = remove ? 'confirm' : 'hidden'
    return(
        <div>
            <div>{user?
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
            </div>: ''}
            </div>
            <div>{type?
            <div>
            <h1>{postOrQuestion.title}</h1>
            <h3>{postOrQuestion.description}</h3>
            <ul>{responsesList}</ul>
            </div> :
            <div>
            <h1>{postOrQuestion.question}</h1>
            <h3>{postOrQuestion.description}</h3>
            <ul>{responsesList}</ul>
            </div>
            
                }
            </div>
            

        </div>

    )
}
export default DetailPage 
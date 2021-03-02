import React from "react"
import { useState, useContext, useEffect } from "react/cjs/react.development"
import {TopicSpecificContext} from "../logic/TopicContext"
import {UserDataContext} from "../logic/UserDataContext"

function NewPost(){
    //display user activity
    const [post, setPost] = useState({title:'', description: ''})
    const [question, setQuestion] = useState({question:'', description:''})
    //function for adding post and questions
    const {addPost, addQuestion}=useContext(UserDataContext)
    //grabbing topics from context
    const {topics, getAllTopics} = useContext(TopicSpecificContext)
    //grabs chosen topic from the dropdown menu and sends it to addPost(every post needs a topicID)
    const [chosenTopic, setChosenTopic] = useState('6032d4baa9ae8a0d2c58a587')
    //For style purposes/reusability
    const [questionOrPost, setQuestionOrPost] = useState('post')

    useEffect(()=>{
        getAllTopics()
        // eslint-disable-next-line
    },[])
    //tracks form/state text inputs
    function handleChange(e){
        const {name, value} = e.target
        if(questionOrPost === 'post'){
            setPost(prev=>({...prev, [name]:value}))
        }else{
            setQuestion(prev=>({...prev, [name]:value}))
        }  
    }
    //tracks radio button and dropdown menu
    function handleOtherChange(e){
        const {checked, name, type, value} = e.target
        type === 'radio' ? setQuestionOrPost(()=>checked&&name) : setChosenTopic(value)  
    }
//add a post or function depending on user input
    function submitNewPost(e){
        if(questionOrPost=== 'post'){
            addPost(chosenTopic,post)
        }else{
            addQuestion(chosenTopic, question)
        }
        
    }
    //style purposes/reusability
    const prompt = questionOrPost === 'post' ? `Share your advice!`: `Ask your question!`
    const titleOrQuestionName = questionOrPost === 'post'? 'title' : 'question'
    const titleOrQuestion = questionOrPost === 'post'? 'Title' : 'Question'
    const titleOrQuestionValue = questionOrPost === 'post'? post.title :question.question 
    //plugs topics into dropDown menu
    const topicMenu = topics.map(topic=>{
        return <option key = {topic._id}value = {topic._id}>{topic.topic}</option>
    })
    return(
        <div>
            <form className = 'addPost'>
            <label>Topics</label>
                <select 
                    value={topics.topic}
                    type = 'dropDown'
                    onChange={handleOtherChange}
                    name="topic">
                    {topicMenu}
                </select>
                <p>Would you like to ask a question or post some advice</p>
                <br/>
                <div className = 'radio'>
                    <label>Question</label>
                    <input
                    name = 'question' 
                    value= 'question'
                    type = 'radio'
                    checked = {questionOrPost === 'question'}
                    onChange = {handleOtherChange}
                    />
                    <label>Post</label>
                    <input
                    name = 'post'
                    value= 'post'
                    type = 'radio'
                    checked = {questionOrPost === 'post'}
                    onChange = {handleOtherChange}
                    />
                </div>
                <br/>
                <p>{titleOrQuestion}</p>
                <input
                name = {titleOrQuestionName}
                value = {titleOrQuestionValue}
                type = 'text'
                onChange = {handleChange}
                required/>
                <p>A brief description</p>
                <textarea
                rows = "6"
                columns = "50"
                value = {questionOrPost==='post'? post.description : question.description}
                type = "text"
                name = "description"
                onChange = {handleChange}
                required
                />
                <br/>
                <button onClick = {submitNewPost}>{prompt}</button> 
            </form>
        </div>
    )
}
export default NewPost 
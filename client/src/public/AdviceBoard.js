import React, {useContext, useEffect, useState} from "react"
import ListComponent from "../recurringComponents/ListComponent"
import {TopicSpecificContext} from "../logic/TopicContext"

function AdviceBoard(){
    //gets topic specific info and fucntion from context
    const myContext = useContext(TopicSpecificContext)
    const {posts, topics, questions, getTopicQuestions, getAllTopics, getTopicPosts} = myContext
    //initial display will always be pregnancy topics
    const [chosenTopic, setChosenTopic] = useState('6032d4baa9ae8a0d2c58a587')
    //plugs topics from context into dropdown menu
    const topicMenu = topics.map(topic=>{
        return <option value = {topic._id}>{topic.topic}</option>
    })
    //track text inputs
    function handleDropDown(e){
        const {value} = e.target
        setChosenTopic(value)      
    }
    //loads data from context
    useEffect(()=>{
        getAllTopics()
        getTopicPosts(chosenTopic)
        getTopicQuestions(chosenTopic)
        //eslint-disable-next-line
    },[chosenTopic])
    console.log(questions)
    
    return(
        <div>
            <label>Topics</label>
            <select 
                value={topics.topic}
                onChange={handleDropDown}
                name="topic">
                {topicMenu}
            </select>
            {<ListComponent posts ={posts} questions ={questions} responses = {[]} user = {false}/>}
        </div>
    )
}

export default AdviceBoard 
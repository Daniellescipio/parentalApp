import React, {useContext, useEffect, useState} from "react"
import ListComponent from "../logic/ListComponent"
import {TopicSpecificContext} from "../logic/useTopicSpecificData"

function AdviceBoard(){
    const myContext = useContext(TopicSpecificContext)
    const {loading, posts, topics, questions, getTopicQuestions, getAllTopics, getTopicPosts} = myContext
    const [chosenTopic, setChosenTopic] = useState('6032d4afa9ae8a0d2c58a586')
    const topicMenu = topics.map(topic=>{
        return <option value = {topic._id}>{topic.topic}</option>
    })
    function handleDropDown(e){
        const {value} = e.target
        setChosenTopic(value)      
    }
    useEffect(()=>{
        getAllTopics()
        getTopicPosts(chosenTopic)
        getTopicQuestions(chosenTopic)
        //eslint-disable-next-line
    },[chosenTopic])

    if(!loading){
        console.log(posts)
    }
    
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
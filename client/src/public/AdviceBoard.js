import React, {useContext, useEffect, useState} from "react"
import ListComponent from "../recurringComponents/ListComponent"
import {TopicSpecificContext} from "../logic/TopicContext"

function AdviceBoard(){
    //gets topic specific info and fucntion from context
    const myContext = useContext(TopicSpecificContext)
    const {posts, topics, questions, allPosts, allQuestions, getAllPosts, getAllQuestions, getTopicQuestions, getAllTopics, getTopicPosts} = myContext
    //initial display will always be pregnancy topics
    const [chosenTopic, setChosenTopic] = useState('all')
    //plugs topics from context into dropdown menu
    const topicMenu = topics.map(topic=>{
        return <option key = {topic._id} value = {topic._id}>{topic.topic}</option>
    })
    //track text inputs
    function handleDropDown(e){
        const {value} = e.target
        setChosenTopic(value)      
    }
    //loads data from context
    useEffect(()=>{
        getAllTopics()
        if(chosenTopic !== 'all'){
            getTopicPosts(chosenTopic)
            getTopicQuestions(chosenTopic)
        }else{
            getAllPosts()
            getAllQuestions()
        }
        //eslint-disable-next-line
    },[chosenTopic])
    
    return(
        <div className = 'adviceboard'>
            <label>Topics</label>
            <select 
                value={topics.topic}
                onChange={handleDropDown}
                name="topic">
                <option value = 'all'>All</option>
                {topicMenu}
            </select>
            {<ListComponent posts ={chosenTopic !== 'all'? posts: allPosts} questions ={chosenTopic !== 'all'? questions: allQuestions} responses = {[]} user = {false}/>}
        </div>
    )
}

export default AdviceBoard 